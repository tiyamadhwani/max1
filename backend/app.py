from flask import Flask, request, jsonify
from flask_cors import CORS
import csv
import os
from datetime import datetime
import google.generativeai as genai

app = Flask(__name__)

# ── CORS ──────────────────────────────────────────────────────────────────────
ALLOWED_ORIGINS = os.environ.get(
    "ALLOWED_ORIGINS",
    "http://localhost:5173,http://localhost:3000,https://maxburgerandmore.com,https://www.maxburgerandmore.com"
).split(",")

CORS(app, origins=ALLOWED_ORIGINS, supports_credentials=True)

# ── Gemini setup ──────────────────────────────────────────────────────────────
GEMINI_API_KEY = os.environ.get("GEMINI_API_KEY", "")
genai.configure(api_key=GEMINI_API_KEY)
model = genai.GenerativeModel("gemini-2.0-flash")

# ── CSV ───────────────────────────────────────────────────────────────────────
CSV_FILE = "franchise_inquiries.csv"
CSV_HEADERS = ["Name", "Email", "Phone", "City", "State",
               "Investment_Budget", "Experience", "Message", "Timestamp"]

def ensure_csv():
    if not os.path.exists(CSV_FILE):
        with open(CSV_FILE, "w", newline="") as f:
            csv.writer(f).writerow(CSV_HEADERS)

# ── Health check ──────────────────────────────────────────────────────────────
@app.route("/api/health", methods=["GET"])
def health():
    return jsonify({"status": "ok", "service": "Max Burger API"})

# ── Franchise inquiry ─────────────────────────────────────────────────────────
@app.route("/api/franchise-inquiry", methods=["POST"])
def franchise_inquiry():
    data = request.get_json(force=True)
    if not data:
        return jsonify({"success": False, "message": "Invalid request"}), 400

    ensure_csv()
    row = [
        data.get("name", ""),
        data.get("email", ""),
        data.get("phone", ""),
        data.get("city", ""),
        data.get("state", ""),
        data.get("budget", ""),
        data.get("experience", ""),
        data.get("message", ""),
        datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
    ]
    with open(CSV_FILE, "a", newline="") as f:
        csv.writer(f).writerow(row)

    print(f"[NEW INQUIRY] {row[0]} | {row[1]} | {row[2]} | {row[3]}, {row[4]}")
    return jsonify({"success": True, "message": "Inquiry submitted successfully!"})

# ── Chatbot (Gemini) ──────────────────────────────────────────────────────────
@app.route("/api/chat", methods=["POST"])
def chat():
    data = request.get_json(force=True)
    user_message = data.get("message", "").strip()
    history = data.get("history", [])

    if not user_message:
        return jsonify({"response": "Please send a message!"}), 400

    system_prompt = """You are Max, the friendly franchise assistant for Max Burger & More — a fast-growing Indian burger franchise brand.

Your role is to help potential franchise partners learn about:
- Franchise investment details (investment range: ₹7-15 lakhs depending on location type)
- Setup & support: full training, kitchen setup, branding, and ongoing support provided
- Revenue potential: average outlet earns ₹2–5 lakhs/month
- Franchise models: Kiosk, Takeaway, Dine-In
- Current locations: Udaipur
- Menu highlights: Burgers, Momos, Fries, Spring rolls, Cold Coffee and many more
- Contact: email maxburgerandmore@gmail.com or fill the inquiry form on the website
- Phone for franchise enquiry: +91 90290 20888

Be enthusiastic, helpful, and professional. Use emojis occasionally. Keep answers concise but informative. Always encourage potential franchisees to fill out the contact form for personalized consultation. If asked about something unrelated to Max Burger franchise, politely redirect to franchise-related topics.
"""

    conversation = system_prompt + "\n\n"
    for msg in history[-10:]:
        role = msg.get("role")
        content = msg.get("content", "")
        if role == "user":
            conversation += f"User: {content}\n"
        else:
            conversation += f"Assistant: {content}\n"
    conversation += f"User: {user_message}\nAssistant:"

    try:
        response = model.generate_content(conversation)
        bot_reply = response.text
    except Exception as e:
        print(f"[CHAT ERROR] {e}")
        bot_reply = "Sorry, I'm having trouble responding right now. Please call +91 90290 20888 or email maxburgerandmore@gmail.com 🍔"

    return jsonify({"response": bot_reply})


if __name__ == "__main__":
    ensure_csv()
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port, debug=False)
