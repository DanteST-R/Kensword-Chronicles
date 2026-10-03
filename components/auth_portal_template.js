window.KENSWORD_TEMPLATES = window.KENSWORD_TEMPLATES || {};
window.KENSWORD_TEMPLATES.authPortal = `
<!-- ===================================================== -->
<!-- PORTAL DA GUILDA — Tela de Login/Registro             -->
<!-- ===================================================== -->
<div id="auth-overlay">
  <div class="portal-container">

    <div class="portal-header">
      <span class="portal-emblem">⚔️</span>
      <h1 class="portal-title">Kensword Chronicles</h1>
      <p class="portal-subtitle">Portal da Guilda de Aventureiros</p>
    </div>

    <div class="portal-panel">

      <!-- ── ESCOLHA: Login ou Registro ── -->
      <div id="auth-choice" class="auth-choice">
        <div class="auth-choice-title">Escolha seu destino</div>
        <div class="auth-btn-group">
          <button class="auth-btn auth-btn-primary" onclick="showAuthForm('register')">
            <span class="auth-btn-icon">📜</span>
            <span class="auth-btn-text">
              Inscreva seu personagem no RPG!
              <span>Crie uma nova ficha de aventureiro</span>
            </span>
          </button>
          <button class="auth-btn auth-btn-secondary" onclick="showAuthForm('login')">
            <span class="auth-btn-icon">🗝️</span>
            <span class="auth-btn-text">
              Já tem um personagem? Logue aqui!
              <span>Acesse sua ficha existente</span>
            </span>
          </button>
        </div>
      </div>

      <!-- ── FORMULÁRIO DE LOGIN ── -->
      <div id="auth-login" class="auth-form">
        <button class="form-back-btn" onclick="showAuthChoice()">← Voltar</button>
        <div class="form-section-title">Identificação do Aventureiro</div>
        <div class="field-group">
          <label for="login-name">Nome do Jogador</label>
          <span class="field-hint">O mesmo nome usado no cadastro</span>
          <input type="text" id="login-name" placeholder="Seu nome de jogador">
          <div class="field-error" id="login-name-err">Por favor, insira seu nome.</div>
        </div>
        <div class="field-group">
          <label for="login-pass">Senha</label>
          <input type="password" id="login-pass" placeholder="Sua senha secreta">
          <div class="field-error" id="login-pass-err">Por favor, insira sua senha.</div>
        </div>
        <div class="field-error" id="login-general-err" style="font-size:0.9rem;margin-top:0.5rem;"></div>
        <button class="form-submit-btn" id="login-submit-btn" onclick="handleLogin()">🗝️ Entrar no Compêndio</button>
      </div>

      <!-- ── FORMULÁRIO DE REGISTRO ── -->
      <div id="auth-register" class="auth-form">
        <button class="form-back-btn" onclick="showAuthChoice()">← Voltar</button>
        <div class="register-steps">
          <div class="step-dot active" id="step-dot-0"></div>
          <div class="step-dot" id="step-dot-1"></div>
          <div class="step-dot" id="step-dot-2"></div>
          <div class="step-dot" id="step-dot-3"></div>
        </div>

        <!-- PASSO 0: Dados do Jogador -->
        <div id="reg-step-0" class="reg-step">
          <div class="form-section-title">Dados do Jogador</div>
          <div class="field-group">
            <label for="reg-player-name">Nome do Jogador</label>
            <span class="field-hint">Coloque seu nome aqui. Esse nome será usado no login.</span>
            <input type="text" id="reg-player-name" placeholder="Ex: JogadorUm">
            <div class="field-error" id="err-player-name"></div>
          </div>
          <div class="field-group">
            <label for="reg-player-age">Idade do Jogador</label>
            <span class="field-hint">Coloque sua idade aqui.</span>
            <input type="number" id="reg-player-age" placeholder="Ex: 20" min="1" max="120">
            <div class="field-error" id="err-player-age"></div>
          </div>
          <div class="field-group">
            <label>Disponibilidade</label>
            <span class="field-hint">Coloque que tempo você fica livre.</span>
            <div class="checkbox-group">
              <label class="checkbox-pill"><input type="checkbox" name="avail" value="Manhã"> 🌅 Manhã</label>
              <label class="checkbox-pill"><input type="checkbox" name="avail" value="Tarde"> ☀️ Tarde</label>
              <label class="checkbox-pill"><input type="checkbox" name="avail" value="Noite"> 🌙 Noite</label>
              <label class="checkbox-pill"><input type="checkbox" name="avail" value="Madrugada"> 🌃 Madrugada</label>
            </div>
            <div class="field-error" id="err-avail"></div>
          </div>
          <div class="field-group">
            <label for="reg-pass">Senha</label>
            <span class="field-hint">Coloque sua senha para entrar no app. Mínimo de 8 caracteres.</span>
            <div style="position:relative;">
              <input type="password" id="reg-pass" placeholder="Mínimo 8 caracteres" minlength="8" style="padding-right:2.5rem;">
              <button type="button" style="position:absolute; right:0.5rem; top:50%; transform:translateY(-50%); background:none; border:none; font-size:1.1rem; cursor:pointer; opacity:0.7; padding:0;" onclick="togglePassword('reg-pass')">👁️</button>
            </div>
            <div class="field-error" id="err-pass"></div>
          </div>
          <div class="field-group">
            <label for="reg-pass-confirm">Confirmar Senha</label>
            <div style="position:relative;">
              <input type="password" id="reg-pass-confirm" placeholder="Repita sua senha" style="padding-right:2.5rem;">
              <button type="button" style="position:absolute; right:0.5rem; top:50%; transform:translateY(-50%); background:none; border:none; font-size:1.1rem; cursor:pointer; opacity:0.7; padding:0;" onclick="togglePassword('reg-pass-confirm')">👁️</button>
            </div>
            <div class="field-error" id="err-pass-confirm"></div>
          </div>
          <button class="form-submit-btn" onclick="goToStep(1)">Próximo: Dados do Personagem →</button>
        </div>

        <!-- PASSO 1: Dados do Personagem -->
        <div id="reg-step-1" class="reg-step" style="display:none">
          <div class="form-section-title">Dados do Personagem</div>
          <div style="display:flex; gap:1.5rem; flex-wrap:wrap;">
            <div style="flex:1; min-width:200px;">
              <div class="field-group">
                <label for="reg-char-name">Nome do Personagem</label>
                <span class="field-hint">Apenas letras.</span>
                <input type="text" id="reg-char-name" placeholder="Ex: Herói Principal">
                <div class="field-error" id="err-char-name"></div>
              </div>
              <div class="field-group" style="margin-bottom:0;">
                <label for="reg-char-age">Idade do Personagem</label>
                <span class="field-hint">Deve bater com a expectativa de vida da raça.</span>
                <input type="number" id="reg-char-age" placeholder="Ex: 25" min="1">
                <div class="field-error" id="err-char-age"></div>
              </div>
            </div>
            <div style="display:flex; flex-direction:column; align-items:center; margin-bottom:1rem;">
              <label style="font-family:'Cinzel',serif; font-size:0.95rem; color:var(--ink); margin-bottom:0.4rem;">Aparência (Foto)</label>
              <div class="avatar-upload-box" onclick="document.getElementById('reg-char-avatar').click()">
                <img id="avatar-preview" src="" alt="Avatar" style="width:100%; height:100%; object-fit:cover; display:none;">
                <div id="avatar-placeholder-text" style="font-size:0.85rem; line-height:1.4;">📷<br>Importar</div>
              </div>
              <input type="file" id="reg-char-avatar" accept="image/*" style="display:none;" onchange="onAvatarSelected(event)">
              <input type="hidden" id="reg-char-avatar-base64">
            </div>
          </div>
          <div class="field-group">
            <label for="reg-char-race">Raça</label>
            <span class="field-hint">Selecione a raça do seu personagem.</span>
            <select id="reg-char-race" onchange="onRaceChange()">
              <option value="">— Escolha uma raça —</option>
            </select>
            <div class="race-preview" id="race-preview">
              <img id="race-preview-img" src="" alt="">
              <div class="race-preview-info">
                <div class="race-preview-name" id="race-preview-name"></div>
                <div class="race-preview-appearance" id="race-preview-appearance"></div>
              </div>
            </div>
            <div class="field-error" id="err-char-race"></div>
          </div>
          <div class="field-group">
            <label>Gênero</label>
            <div class="radio-group">
              <label class="radio-pill"><input type="radio" name="gender" value="Masculino"> ♂ Masculino</label>
              <label class="radio-pill"><input type="radio" name="gender" value="Feminino"> ♀ Feminino</label>
              <label class="radio-pill"><input type="radio" name="gender" value="Hermafrodita"> ⚥ Hermafrodita</label>
              <label class="radio-pill"><input type="radio" name="gender" value="Sem gênero"> ✦ Sem gênero</label>
            </div>
            <div class="field-error" id="err-gender"></div>
          </div>
          <div class="field-row">
            <div class="field-group">
              <label for="reg-height">Altura (em centímetros)</label>
              <span class="field-hint" id="height-hint">Verificada de acordo com sua raça.</span>
              <input type="number" id="reg-height" placeholder="Ex: 175" min="1" oninput="onHeightInput()">
              <div id="height-converted" style="font-family:'EB Garamond',serif;font-style:italic;font-size:0.88rem;color:var(--wood-plank);margin-top:0.3rem;"></div>
              <div class="field-error" id="err-height"></div>
            </div>
            <div class="field-group">
              <label for="reg-weight">Peso (em quilos)</label>
              <input type="number" id="reg-weight" placeholder="Ex: 70" min="1" oninput="onWeightInput()">
              <div class="weight-confirm" id="weight-confirm">
                <span>⚖️</span><span id="weight-confirm-text"></span>
              </div>
              <div class="field-error" id="err-weight"></div>
            </div>
          </div>
          <div class="field-group">
            <label for="reg-location">Local Atual</label>
            <select id="reg-location">
              <option value="">— Escolha sua localização —</option>
              <option>Balistia</option><option>Terras de Balistia</option>
              <option>Hogoku</option><option>Fazendas do Reino</option>
              <option>Masmorra Gigante</option><option>Masmorra do Lago</option>
              <option>Rakuyo</option><option>Yoseki</option>
              <option>Império de Umbra</option><option>Terras de Umbra</option>
              <option>Masmorra Umbral</option><option>Império Gélido Korikiwa</option>
              <option>Santuário de Hikarium</option><option>Hikariima</option>
              <option>Sede da Igreja Dourada</option><option>Monte Olimpo</option>
              <option>Dobunato</option><option>Yami</option>
              <option>Livinia</option><option>Astera</option>
            </select>
            <div class="field-error" id="err-location"></div>
          </div>
          <div style="display:flex;gap:1rem;margin-top:1.5rem;">
            <button class="form-submit-btn" style="background:var(--parchment-aged);color:var(--ink);border-color:var(--wood-plank);flex:0 0 auto;width:auto;padding:0.8rem 1.5rem;" onclick="goToStep(0)">← Voltar</button>
            <button class="form-submit-btn" style="flex:1;" onclick="goToStep(2)">Próximo: Habilidade Única →</button>
          </div>
        </div>

        <!-- PASSO 2: Habilidade Única -->
        <div id="reg-step-2" class="reg-step" style="display:none">
          <div class="form-section-title">Habilidade Única</div>
          <span class="field-hint" style="display:block;margin-bottom:0.8rem;">Descreva como será a sua habilidade única. O mestre definirá os bônus e penalidades.</span>
          <div class="unique-ability-box">
            <div class="field-group">
              <label for="reg-ua-title">Título da Habilidade</label>
              <input type="text" id="reg-ua-title" placeholder="Ex: Vento Cortante">
              <div class="field-error" id="err-ua-title"></div>
            </div>
            <div class="field-group">
              <label for="reg-ua-desc">Descrição</label>
              <textarea id="reg-ua-desc" placeholder="Descreva sua habilidade única in detalhes..."></textarea>
              <div class="field-error" id="err-ua-desc"></div>
            </div>
            <div class="field-row" style="display:none;">
              <div class="field-group">
                <label>Buffs <span class="admin-only-badge">Admin</span></label>
                <input class="field-readonly" type="text" id="reg-ua-buffs" value="— a ser definido pelo mestre —" readonly>
              </div>
              <div class="field-group">
                <label>Nerfs <span class="admin-only-badge">Admin</span></label>
                <input class="field-readonly" type="text" id="reg-ua-nerfs" value="— a ser definido pelo mestre —" readonly>
              </div>
            </div>
          </div>
          <div style="display:flex;gap:1rem;margin-top:1.5rem;">
            <button class="form-submit-btn" style="background:var(--parchment-aged);color:var(--ink);border-color:var(--wood-plank);flex:0 0 auto;width:auto;padding:0.8rem 1.5rem;" onclick="goToStep(1)">← Voltar</button>
            <button class="form-submit-btn" style="flex:1;" onclick="goToStep(3)">Próximo: Atributos & História →</button>
          </div>
        </div>

        <!-- PASSO 3: Habilidades, Atributos, História -->
        <div id="reg-step-3" class="reg-step" style="display:none">
          <div class="form-section-title">Itens Iniciais</div>
          <span class="field-hint" style="display:block;margin-bottom:0.8rem;">Seus itens iniciais — opcional, pode editar depois.</span>
          <div class="field-group"><input type="text" id="reg-item1" placeholder="Item 1 (opcional)"></div>
          <div class="field-group"><input type="text" id="reg-item2" placeholder="Item 2 (opcional)"></div>
          <div class="field-group"><input type="text" id="reg-item3" placeholder="Item 3 (opcional)"></div>

          <div class="form-section-title">Habilidades</div>
          <div class="unique-ability-box">
            <div class="field-group"><label>Habilidades de Raça <span class="admin-only-badge">Admin</span></label><input class="field-readonly" type="text" value="— atribuídas ao criar o personagem —" readonly></div>
            <div class="field-group"><label>Habilidades Aprendidas <span class="admin-only-badge">Admin</span></label><input class="field-readonly" type="text" value="— adquiridas durante o RPG —" readonly></div>
            <div class="field-group" style="margin-bottom:0"><label>Habilidades Simples <span class="admin-only-badge">Admin</span></label><input class="field-readonly" type="text" value="— adquiridas durante o RPG —" readonly></div>
          </div>

          <div class="form-section-title">Elementos</div>
          <div class="unique-ability-box">
            <div class="field-group">
              <label for="reg-element">Elemento Inicial — Escolha seu principal</label>
              <select id="reg-element" onchange="onElementChange()">
                <option value="">— Escolha seu elemento —</option>
                <optgroup label="Elementos Básicos">
                  <option value="Fogo">🔥 Fogo</option>
                  <option value="Água">💧 Água</option>
                  <option value="Terra">🌍 Terra</option>
                  <option value="Vento">🌬️ Vento</option>
                  <option value="Gelo">❄️ Gelo</option>
                </optgroup>
                <optgroup label="Elementos Arcanos">
                  <option value="Planta">🌿 Planta</option>
                  <option value="Mineral">💎 Mineral</option>
                  <option value="Relâmpago">⚡ Relâmpago</option>
                  <option value="Luz">✨ Luz</option>
                  <option value="Sombra">🌑 Sombra</option>
                  <option value="Dimensional">🌌 Dimensional</option>
                </optgroup>
                <optgroup label="Elementos Místicos">
                  <option value="Sagrado">🕊️ Sagrado</option>
                  <option value="Trevas">🦇 Trevas</option>
                </optgroup>
                <optgroup label="Elementos Supremos">
                  <option value="Chaos" disabled>🕳️ Chaos (Primordial - Bloqueado)</option>
                  <option value="Khosmos" disabled>🌌 Khosmos (Primordial - Bloqueado)</option>
                </optgroup>
              </select>
              <div id="element-preview" style="display:none; margin-top:0.8rem; padding:1rem; border:1px solid var(--wood-plank); border-radius:6px; background:rgba(0,0,0,0.15);">
                <div id="el-prev-title" style="font-family:'Cinzel',serif; font-size:1.1rem; font-weight:bold; color:var(--gold);"></div>
                <div id="el-prev-traits" style="font-style:italic; font-size:0.85rem; color:#aaa; margin-bottom:0.5rem;"></div>
                <div id="el-prev-desc" style="font-size:0.9rem; line-height:1.4;"></div>
              </div>
            </div>
            <div class="field-row">
              <div class="field-group"><label>Elementos Arcanos <span class="admin-only-badge">Admin</span></label><input class="field-readonly" type="text" value="— desbloqueado futuramente —" readonly></div>
              <div class="field-group"><label>Elementos Místicos <span class="admin-only-badge">Admin</span></label><input class="field-readonly" type="text" value="— desbloqueado futuramente —" readonly></div>
            </div>
          </div>

          <div class="form-section-title">Progressão</div>
          <div class="unique-ability-box">
            <div class="field-row">
              <div class="field-group"><label>Magias <span class="admin-only-badge">Admin</span></label><input class="field-readonly" type="text" value="— ainda não aprendidas —" readonly></div>
              <div class="field-group"><label>Classes <span class="admin-only-badge">Admin</span></label><input class="field-readonly" type="text" value="— ainda não definidas —" readonly></div>
            </div>
            <div class="field-row">
              <div class="field-group"><label>Perícias <span class="admin-only-badge">Admin</span></label><input class="field-readonly" type="text" value="— ainda não definidas —" readonly></div>
              <div class="field-group"><label>Level</label><input class="field-readonly" type="text" value="Nível 1 — 00/1.000 XP" readonly></div>
            </div>
          </div>

          <div class="form-section-title">Atributos</div>
          <div class="attr-pool">
            <div class="attr-pool-header">
              <span class="attr-pool-label">Distribua 250 pontos</span>
              <span class="attr-points-remaining" id="attr-remaining">250 restantes</span>
            </div>
            <div class="attr-row"><label>⚔ Força</label><button class="attr-btn" onclick="changeAttr('strength',-10)">−</button><input type="number" id="attr-strength" value="0" readonly><button class="attr-btn" onclick="changeAttr('strength',10)">+</button></div>
            <div class="attr-row"><label>🛡 Resistência</label><button class="attr-btn" onclick="changeAttr('resistance',-10)">−</button><input type="number" id="attr-resistance" value="0" readonly><button class="attr-btn" onclick="changeAttr('resistance',10)">+</button></div>
            <div class="attr-row"><label>⚡ Velocidade</label><button class="attr-btn" onclick="changeAttr('speed',-10)">−</button><input type="number" id="attr-speed" value="0" readonly><button class="attr-btn" onclick="changeAttr('speed',10)">+</button></div>
            <div class="attr-row"><label>✨ Magia</label><button class="attr-btn" onclick="changeAttr('magic',-10)">−</button><input type="number" id="attr-magic" value="0" readonly><button class="attr-btn" onclick="changeAttr('magic',10)">+</button></div>
            <div class="field-error" id="err-attrs" style="margin-top:0.5rem;"></div>
          </div>

          <div class="form-section-title">História</div>
          <div class="field-group">
            <label for="reg-story">Conte a história do seu personagem <em style="font-weight:700;text-transform:none;color:var(--red-wax);">* Obrigatório (Mínimo de 100 palavras)</em></label>
            <span class="field-hint">Escreva detalhadamente a origem e jornada do seu personagem para enriquecer a lore e ser aceito na guilda.</span>
            <textarea id="reg-story" style="min-height:150px;" placeholder="Era uma vez, em terras de Kensword..." oninput="updateWordCount()"></textarea>
            <div class="word-counter" id="word-counter">0 palavras</div>
          </div>

          <div class="form-section-title">Linhagem</div>
          <div class="field-group">
            <label>Sua Linhagem <span class="admin-only-badge">Admin</span></label>
            <input class="field-readonly" type="text" value="— a ser revelada pelo mestre —" readonly>
          </div>

          <div style="display:flex;gap:1rem;margin-top:1.5rem;">
            <button class="form-submit-btn" style="background:var(--parchment-aged);color:var(--ink);border-color:var(--wood-plank);flex:0 0 auto;width:auto;padding:0.8rem 1.5rem;" onclick="goToStep(2)">← Voltar</button>
            <button class="form-submit-btn" style="flex:1;" id="register-submit-btn" onclick="handleRegister()">📜 Inscrever Personagem na Guilda</button>
          </div>
          <div class="field-error" id="err-register-general" style="margin-top:0.5rem;text-align:center;font-size:0.9rem;"></div>
        </div>

      </div><!-- /auth-register -->

      <div class="auth-loading" id="auth-loading">
        <div class="auth-spinner"></div>
        Consultando os registros da guilda...
      </div>

    </div><!-- /portal-panel -->
  </div><!-- /portal-container -->
</div><!-- /auth-overlay -->
`;
