(function () {
  const popupHTML = function ({ icon, token, useCase, isDev }) {
    return `
  <div class="chatbot-icon" id="chatbot-icon" style="
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
    z-index:500;
">
${icon ? `<img src="${icon}" style="width: 30px; height: 30px;"/>` : "💬"}
    
</div>

<div id="chatbot-modal" style="
    display: none;
    position: fixed;
    top: 0;
    left: -12px;
    width: 100%;
    height: 100%;
    z-index: 1000;
    justify-content: end;
    align-items: end;
">
    <div style="
        background-color: white;
        width: 500px;
        border-radius: 8px;
        position: relative;
        height: 1020px;
    " class="shadow-lg">

<div style="display: flex;justify-content: space-between; color:white; background-color:#0f1c62; padding:20px; border-radius: 12px 12px 0px 0px;" > 
  
    <p> Data Guru Chat </p> 
   
    <button id="chatbot-close" style="
        background: transparent;
        border: none;
        font-size: 16px;
        cursor: pointer;
        margin-right:15px;
        color:white
    ">✖</button>
  </div>
            <iframe src="${isDev ? "http://localhost:4200" : "https://platform.pnpai.co"}/guruchatonly?token=${token}&useCase=${useCase}" style="width:100%;height:86vh;"/>

    </div>
</div>
`;
  };

  // Function to create the popup
  const createPopup = (options) => {
    document.body.insertAdjacentHTML("beforeend", popupHTML(options));
    requestAnimationFrame(() => {
      const chatbotIcon = document.getElementById("chatbot-icon");
      const chatbotModal = document.getElementById("chatbot-modal");
      const closeModal = document.getElementById("chatbot-close");

      chatbotIcon.addEventListener("click", () => {
        chatbotModal.style.display = "flex";
      });

      closeModal.addEventListener("click", () => {
        chatbotModal.style.display = "none";
      });
    });
  };
  // Expose the SDK to the global scope
  window.ChatbotSDK = {
    initialize: function (options) {
      createPopup(options);
    },
  };
})();
