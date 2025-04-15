function criarBarraCronometro() {
    if (document.getElementById("cronometro-barra")) return;
  
    const barra = document.createElement("div");
    barra.id = "cronometro-barra";
  
    // Recupera a posição salva, se existir
    const posSalva = JSON.parse(localStorage.getItem("posicaoCronometro"));
    barra.style.top = posSalva?.top || "100px";
    barra.style.left = posSalva?.left || "100px";
  
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
    btnReset.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M520-330v-60h160v60H520Zm60 210v-50h-60v-60h60v-50h60v160h-60Zm100-50v-60h160v60H680Zm40-110v-160h60v50h60v60h-60v50h-60Zm111-280h-83q-26-88-99-144t-169-56q-117 0-198.5 81.5T200-480q0 72 32.5 132t87.5 98v-110h80v240H160v-80h94q-62-50-98-122.5T120-480q0-75 28.5-140.5t77-114q48.5-48.5 114-77T480-840q129 0 226.5 79.5T831-560Z"/></svg>
    `;
  
    const btnConfig = document.createElement("button");
    btnConfig.innerHTML = `
    
<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="m234-480-12-60q-12-5-22.5-10.5T178-564l-58 18-40-68 46-40q-2-13-2-26t2-26l-46-40 40-68 58 18q11-8 21.5-13.5T222-820l12-60h80l12 60q12 5 22.5 10.5T370-796l58-18 40 68-46 40q2 13 2 26t-2 26l46 40-40 68-58-18q-11 8-21.5 13.5T326-540l-12 60h-80Zm40-120q33 0 56.5-23.5T354-680q0-33-23.5-56.5T274-760q-33 0-56.5 23.5T194-680q0 33 23.5 56.5T274-600ZM592-40l-18-84q-17-6-31.5-14.5T514-158l-80 26-56-96 64-56q-2-18-2-36t2-36l-64-56 56-96 80 26q14-11 28.5-19.5T574-516l18-84h112l18 84q17 6 31.5 14.5T782-482l80-26 56 96-64 56q2 18 2 36t-2 36l64 56-56 96-80-26q-14 11-28.5 19.5T722-124l-18 84H592Zm56-160q50 0 85-35t35-85q0-50-35-85t-85-35q-50 0-85 35t-35 85q0 50 35 85t85 35Z"/></svg>
    `;
  
    controles.appendChild(btnStart);
    controles.appendChild(btnPause);
    controles.appendChild(btnReset);
    controles.appendChild(btnConfig);
  
    barra.appendChild(timer);
    barra.appendChild(controles);
    document.body.appendChild(barra);
  
    tornarArrastavel(barra); // arrastar e salvar
  
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
  
    btnConfig.onclick = () => {
        window.open("chrome-extension://pkelgfjialdkbomdkgmjkbfcieedjcko/options.html", "_blank");
      };
      
      
  }
  
  function tornarArrastavel(el) {
    let isDragging = false;
    let offsetX, offsetY;
  
    el.addEventListener("mousedown", (e) => {
      if (e.target.tagName === "BUTTON" || e.target.tagName === "SVG" || e.target.tagName === "PATH") return;
      isDragging = true;
      offsetX = e.clientX - el.offsetLeft;
      offsetY = e.clientY - el.offsetTop;
      el.style.transition = "none";
      document.body.style.userSelect = "none";
    });
  
    document.addEventListener("mousemove", (e) => {
      if (isDragging) {
        const left = `${e.clientX - offsetX}px`;
        const top = `${e.clientY - offsetY}px`;
        el.style.left = left;
        el.style.top = top;
  
        // Salvar a posição no localStorage
        localStorage.setItem("posicaoCronometro", JSON.stringify({ top, left }));
      }
    });
  
    document.addEventListener("mouseup", () => {
      isDragging = false;
      document.body.style.userSelect = "";
    });
  }
  
  criarBarraCronometro();
  