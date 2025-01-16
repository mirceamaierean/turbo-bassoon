import os
import re
import json
import faiss
import numpy as np
from ollama import chat
from datetime import datetime, timezone
from flask import Flask, request, jsonify
from sentence_transformers import SentenceTransformer

# **Initialize Flask app**
app = Flask(__name__)
# app.logger.setLevel(logging.DEBUG)
# CORS(app)

# **Step 1: Load Dataset**
with open("data.json", "r", encoding="utf-8") as f:
    articles = json.load(f)


def retrieve_relevant_chunks(keywords, time_interval=None, num_results=10):
    """
    Retrieve relevant chunks using FAISS index, optionally filtered by a time interval.
    """
    query_embedding = embedding_model.encode([keywords])
    _, indices = index.search(np.array(query_embedding), num_results * 1000)  # Get more results to filter by date
    print("aici ", indices)
    results = [corpus[i] for i in indices[0]]

    # Filter by time interval if provided
    if time_interval:
        start_date, end_date = time_interval
        results = [
            article for article in results
            if start_date <= datetime.fromisoformat(article["dateTime"]) <= end_date
        ]

    # Keep only unique URLs
    unique_urls = []
    seen_urls = set()
    for chunk in results:
        if chunk["url"] not in seen_urls:
            unique_urls.append(chunk["url"])
            seen_urls.add(chunk["url"])
        if len(unique_urls) >= 10:
            break

    return unique_urls

# **Step 4: Main Chatbot Function**
def chatbot(question, time_interval=None):
    relevant_urls = retrieve_relevant_chunks(question, time_interval)

    if not relevant_urls:
        return ["Nu am găsit informații relevante."]

    return relevant_urls

# **Step 5: Preprocess Articles into Chunks and Add Date in Embeddings**
corpus = []
for article in articles:
    for sentence in article["content"]:
        corpus.append({
            "title": article["title"],
            "url": article["url"],
            "dateTime": article.get("dateTime", ""),
            "content": sentence,
        })

# **Step 6: Embeddings and FAISS Setup**
embedding_model = SentenceTransformer('sentence-transformers/paraphrase-multilingual-MiniLM-L12-v2')
print("Loaded embedding model.")

texts = [f"Data: {doc['dateTime']} Conținut: {doc['content']}" for doc in corpus]
embeddings_path = "embeddings.npy"

if os.path.exists(embeddings_path):
    embeddings = np.load(embeddings_path)
    print("Loaded embeddings from disk.")
else:
    embeddings = embedding_model.encode(texts, show_progress_bar=True)
    np.save(embeddings_path, embeddings)
    print("Created and saved embeddings.")

dimension = embeddings.shape[1]
index = faiss.IndexFlatL2(dimension)
index.add(np.array(embeddings))
print("Created FAISS index.")

# **Flask Endpoint**
@app.route('/ask', methods=['POST'])
def ask():
    """
    Flask endpoint that accepts a JSON request with 'question', 'start_date', and 'end_date'.
    """
    data = request.get_json()

    question = data.get("question")
    start_date_str = data.get("start_date")  # Expected format: YYYY-MM-DD
    end_date_str = data.get("end_date")  # Expected format: YYYY-MM-DD

    try:
        start_date = datetime.strptime(start_date_str, "%Y-%m-%d").replace(tzinfo=timezone.utc)
        end_date = datetime.strptime(end_date_str, "%Y-%m-%d").replace(tzinfo=timezone.utc)
    except Exception as e:
        return jsonify({"error": "Invalid date format. Use 'YYYY-MM-DD'."}), 400

    urls = chatbot(question, time_interval=(start_date, end_date))

    return jsonify({"question": question, "urls": urls})

# **Flask Endpoint**
@app.route('/', methods=['GET'])
def home():
    return "<h1>API is working!</h1>"


# **Run the Flask App**
if __name__ == '__main__':
    app.run(port=5001, debug=True)
