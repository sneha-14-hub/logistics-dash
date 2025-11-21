from flask import Flask, request, jsonify
from omnidimension import Client

app = Flask(__name__)
client = Client("j5eBRPbop-ooHadd9kS-t0VOeDfdj1OCPKKOEZu_9Rg")  # 👈 Replace with your real API key
agent_id = response['json'].get('id')
              # 👈 Replace with your real agent ID

@app.route("/chat", methods=["POST"])
def chat():
    data = request.json
    message = data.get("message")

    print("Incoming message:", message)  # ✅ Debug

    if not message:
        return jsonify({"error": "No message provided"}), 400

    try:
        response = client.chat.send(agent_id=agent_id, message=message)
        print("AI Response:", response)  # ✅ Debug
        return jsonify({"reply": response['message']})
    except Exception as e:
        print("Error in Flask:", str(e))  # ✅ Error Log
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(port=5001, debug=True)
