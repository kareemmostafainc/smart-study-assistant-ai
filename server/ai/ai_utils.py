# ======================================================
# Smart Study Assistant (AI Web App)
# Core AI Logic (Text Summarization + Quiz Generation)
# Author: Kareem Mostafa
# ======================================================

from transformers import pipeline
import nltk
import random

# ======================================================
# 1. Initialize NLP Models
# ======================================================

# Load pre-trained summarization model (T5-based)
try:
    summarizer = pipeline("summarization", model="t5-small", tokenizer="t5-small")
except Exception:
    summarizer = None

# Load question generation model (fallback: simple NLP)
nltk.download("punkt", quiet=True)

# ======================================================
# 2. Text Summarization Function
# ======================================================
def summarize_text(text: str) -> str:
    """
    Summarizes input text using a transformer model.
    Falls back to rule-based summarization if model unavailable.
    """

    # Clean and limit text length
    text = text.strip().replace("\n", " ")
    if len(text.split()) < 30:
        return text  # Text too short for summarization

    if summarizer:
        try:
            summary = summarizer(text, max_length=150, min_length=50, do_sample=False)
            return summary[0]["summary_text"]
        except Exception as e:
            print(f"Model summarization failed: {e}")

    # Fallback: simple extractive summarization using NLTK
    from nltk.tokenize import sent_tokenize
    sentences = sent_tokenize(text)
    top_sentences = sentences[: min(5, len(sentences))]
    return " ".join(top_sentences)

# ======================================================
# 3. Quiz Generation Function
# ======================================================
def generate_quiz(text: str) -> list:
    """
    Generates quiz questions based on input text.
    Produces a mix of True/False and Multiple-Choice questions.
    """

    sentences = nltk.sent_tokenize(text)
    if len(sentences) == 0:
        return []

    quiz_data = []

    # Generate True/False questions
    for i, sentence in enumerate(sentences[:3]):
        quiz_data.append({
            "type": "true_false",
            "question": f"True or False: {sentence}",
            "answer": random.choice(["True", "False"])
        })

    # Generate Multiple-Choice questions
    keywords = [w for w in nltk.word_tokenize(text) if w.isalpha()]
    if len(keywords) >= 4:
        for i in range(min(3, len(keywords) // 4)):
            correct = random.choice(keywords)
            options = random.sample(keywords, 4)
            if correct not in options:
                options[random.randint(0, 3)] = correct

            quiz_data.append({
                "type": "multiple_choice",
                "question": f"What word was mentioned in the notes related to '{correct}'?",
                "options": options,
                "answer": correct
            })

    return quiz_data

# ======================================================
# 4. Module Test (Optional Local Run)
# ======================================================
if __name__ == "__main__":
    sample_text = """
    Artificial Intelligence is transforming education. 
    It enables personalized learning experiences, 
    automatic grading, and intelligent tutoring systems.
    """
    print("=== Summary ===")
    print(summarize_text(sample_text))
    print("\n=== Generated Quiz ===")
    print(generate_quiz(sample_text))
