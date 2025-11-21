@app.route("/chat", methods=["POST"])
def chat():
    data = request.json
    message = data.get("message")

    print("Incoming message:", message)

    if not message:
        return jsonify({"error": "No message provided"}), 400

    try:
        response = client.chat.send(agent_id=agent_id, message=message)
        print("AI Response:", response)
        return jsonify({"reply": response['message']})
    except Exception as e:
        print("Error in Flask:", str(e))  # 👈 Watch this in your terminal
        return jsonify({"reply": f"[Error] {str(e)}"}), 500
