(function () {
  const popupHTML = `
      <div id="chatbot-icon" style="
        position: fixed;
        bottom: 20px;
        right: 20px;
        width: 60px;
        height: 60px;
        background-color: #007bff;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        cursor: pointer;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
    ">
        💬
    </div>

    <div id="chatbot-modal" style="
        display: none;
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.5);
        z-index: 1000;
        justify-content: center;
        align-items: center;
    ">
        <div style="
            background-color: white;
            width: 400px;
            border-radius: 8px;
            padding: 20px;
            position: relative;
        ">
            <div id="chatbot-header" style="
                font-weight: bold;
                margin-bottom: 10px;
            ">
                Chat with us!
            </div>
            <div id="chatbot-messages" style="
                max-height: 300px;
                overflow-y: auto;
                border: 1px solid #ccc;
                padding: 10px;
                margin-bottom: 10px;
            "></div>
            <input id="chatbot-input" type="text" placeholder="Type a message..." style="
                width: calc(100% - 22px);
                padding: 10px;
                border: 1px solid #ccc;
                border-radius: 4px;
            ">
            <button id="chatbot-close" style="
                position: absolute;
                top: 10px;
                right: 10px;
                background: transparent;
                border: none;
                font-size: 16px;
                cursor: pointer;
            ">✖</button>
        </div>
    </div>
  `;

  // Function to create the popup
  const createPopup = () => {
    document.body.insertAdjacentHTML("beforeend", popupHTML);
    requestAnimationFrame(() => {
      const chatbotIcon = document.getElementById("chatbot-icon");
      const chatbotModal = document.getElementById("chatbot-modal");
      const closeModal = document.getElementById("chatbot-close");
      const input = document.getElementById("chatbot-input");
      const messages = document.getElementById("chatbot-messages");

      chatbotIcon.addEventListener("click", () => {
        chatbotModal.style.display = "flex";
      });

      closeModal.addEventListener("click", () => {
        chatbotModal.style.display = "none";
      });

      input.addEventListener("keypress", (e) => {
        if (e.key === "Enter") {
          const message = input.value;
          if (message.trim()) {
            messages.innerHTML += `<div>${message}</div>`;
            input.value = ""; // Clear input
            messages.scrollTop = messages.scrollHeight; // Scroll to the bottom
          }
        }
      });
    });
  };

  // Expose the SDK to the global scope
  window.ChatbotSDK = {
    initialize: function (options) {
      // Options can be processed here if needed
      createPopup();
    },
  };
})();
