(function () {
  const popupHTML = function ({ icon,image, token, useCase, isDev,theme }) {
    const renderIcon=()=>{
      if(icon){
        return `<div class="guru-chatbot-icon"  >
                  <img src="${icon}" style="width: 30px; height: 30px;"/>
                </div>` 
      }else if(image){
        return `<img class="guru-chatbot-image" src="${image}"/>`
      }else{
        return "<div class='guru-chatbot-icon'>🧑‍💻💬</div>"
      }
    }
    return `
    <style>
    .guru-chatbot-icon{
      position: fixed;bottom: 20px;right: 20px;width: 60px;height: 60px;
      background-color: ${theme?.secondary??'#f64e60'};border-radius: 50%;display: flex;
      align-items: center;justify-content: center;color: white;cursor: pointer;box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);z-index:500;
    }
    .guru-chatbot-image{
      position: fixed;bottom: 20px;right: 20px;width: 60px;height: 60px;
      cursor: pointer;box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);z-index:500;}
    .guru-chatbot-modal-container{
      display: none;position: fixed;top: 0;left: -12px;width: 100%;height: 100%;z-index: 1000;justify-content: end;align-items: end;
    }
    .guru-chatbot-header{
      display: flex;justify-content: space-between; color:white; background-color:${theme?.primary??'#0f1c62'}; padding:20px; border-radius: 12px 12px 0px 0px;}
    .guru-chatbot-close{
      background: transparent;border: none;font-size: 16px;cursor: pointer;margin-right:15px;color:white;}
    .guru-chatbot-box{
      background-color: white;width: 500px;border-radius: 8px;position: relative;height: auto;
    }
    .guru-chatbot-iframe{
      width:100%;height:86vh;
    }
    @media only screen and (max-width: 600px) {
      .guru-chatbot-box{
        width: 100%;}
      .guru-chatbot-modal-container{
        left: 0;}
      .guru-chatbot-box{height: 100%;}
      .guru-chatbot-iframe{height: 100%;}
    }
    </style>
    <div id="chatbot-icon" >
    ${renderIcon()}
    </div>
    <div id="chatbot-modal" class="guru-chatbot-modal-container">
      <div class="guru-chatbot-box"  >
        <div class="guru-chatbot-header" > 
          <p> Data Guru Chat </p> 
          <button class="guru-chatbot-close" id="chatbot-close">✖</button>
        </div>
        <iframe src="${isDev ? "http://localhost:4200" : "https://platform.pnpai.co"}/guruchatonly?token=${token}&useCase=${useCase}" class="guru-chatbot-iframe"/>
      </div>
    </div>
`;
  };

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