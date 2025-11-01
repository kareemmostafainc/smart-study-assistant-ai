# ======================================================
# Smart Study Assistant (AI Web App)
# AI Backend Server (Flask + NLP)
# Author: Kareem Mostafa
# ======================================================

from flask import Flask, request, jsonify
from ai_utils import summarize_text, generate_quiz
import sys

# ======================================================
# 1. Initialize Flask Application
# ======================================================
app = Flask(__name__)

# ======================================================
# 2. Root Endpoint (Health Check)
# ======================================================
@app.route("/", methods=["GET"])
def home():
    return jsonify({
        "status": "OK",
        "server": "Smart Study Assistant AI Module",
        "message": "AI backend is operational"
    })

# ======================================================
# 3. Summarization Endpoint
# ======================================================
@app.route("/summarize", methods=["POST"])
def summarize():
    try:
        data = request.get_json()
        text = data.get("text", "")

        if not text.strip():
            return jsonify({"error": "Text input is required"}), 400

        summary = summarize_text(text)
        return jsonify({"summary": summary}), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500

# ======================================================
# 4. Quiz Generation Endpoint
# ======================================================
@app.route("/quiz", methods=["POST"])
def quiz():
    try:
        data = request.get_json()
        text = data.get("text", "")

        if not text.strip():
            return jsonify({"error": "Text input is required"}), 400

        quiz_data = generate_quiz(text)
        return jsonify({"quiz": quiz_data}), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500

# ======================================================
# 5. CLI Mode (For Direct Call from Node.js)
# ======================================================
if __name__ == "__main__":
    if len(sys.argv) > 1:
        # Direct mode: called from Node.js with text input
        input_text = " ".join(sys.argv[1:])
        print(summarize_text(input_text))
        sys.exit(0)
    else:
        # API mode: run Flask server
        app.run(host="0.0.0.0", port=8000)
