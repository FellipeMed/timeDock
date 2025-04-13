function criarBarraCronometro() {
    if (document.getElementById("cronometro-barra")) return;
  
    const barra = document.createElement("div");
    barra.id = "cronometro-barra";
    barra.style.top = "100px"; // posição inicial
    barra.style.left = "100px";
  
    const timer = document.createElement("span");
    timer.id = "cronometro-tempo";
    timer.textContent = "00:00:00";
  
    const controles = document.createElement("div");
    controles.id = "cronometro-controles";
  
    const btnStart = document.createElement("button");
    btnStart.textContent = "Iniciar";
  
    const btnPause = document.createElement("button");
    btnPause.textContent = "Pausar";
  
    const btnReset = document.createElement("button");
    btnReset.textContent = "Resetar";
  
    const btnToggle = document.createElement("button");
    btnToggle.textContent = "Esconder";
  
    controles.appendChild(btnStart);
    controles.appendChild(btnPause);
    controles.appendChild(btnReset);
    controles.appendChild(btnToggle);
  
    barra.appendChild(timer);
    barra.appendChild(controles);
    document.body.appendChild(barra);
  
    // 🔧 Ativa o arrastar
    tornarArrastavel(barra);
  
    let segundos = 0;
    let intervalo = null;
    let visivel = true;
  
    function atualizarTempo() {
      const hrs = String(Math.floor(segundos / 3600)).padStart(2, '0');
      const mins = String(Math.floor((segundos % 3600) / 60)).padStart(2, '0');
      const secs = String(segundos % 60).padStart(2, '0');
      timer.textContent = `${hrs}:${mins}:${secs}`;
    }
  
    btnStart.onclick = () => {
      if (!intervalo) {
        intervalo = setInterval(() => {
          segundos++;
          atualizarTempo();
        }, 1000);
      }
    };
  
    btnPause.onclick = () => {
      clearInterval(intervalo);
      intervalo = null;
    };
  
    btnReset.onclick = () => {
      clearInterval(intervalo);
      intervalo = null;
      segundos = 0;
      atualizarTempo();
    };
  
    btnToggle.onclick = () => {
      visivel = !visivel;
      barra.style.display = visivel ? "flex" : "none";
      btnToggle.textContent = visivel ? "Esconder" : "Mostrar";
    };
  }
  
  function tornarArrastavel(el) {
    let isDragging = false;
    let offsetX, offsetY;
  
    el.addEventListener("mousedown", (e) => {
      if (e.target.tagName === "BUTTON") return; // impede drag ao clicar em botões
      isDragging = true;
      offsetX = e.clientX - el.offsetLeft;
      offsetY = e.clientY - el.offsetTop;
      el.style.transition = "none";
      document.body.style.userSelect = "none";
    });
  
    document.addEventListener("mousemove", (e) => {
      if (isDragging) {
        el.style.left = `${e.clientX - offsetX}px`;
        el.style.top = `${e.clientY - offsetY}px`;
      }
    });
  
    document.addEventListener("mouseup", () => {
      isDragging = false;
      document.body.style.userSelect = "";
    });
  }
  
  // ⏱️ Inicializa o cronômetro
  criarBarraCronometro();
  