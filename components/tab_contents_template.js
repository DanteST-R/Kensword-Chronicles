window.KENSWORD_TEMPLATES = window.KENSWORD_TEMPLATES || {};
window.KENSWORD_TEMPLATES.tabContents = `
  <section id="tab-content-history" class="tab-content active">
    <div class="parchment-panel">
      <h2 class="section-title">📜 História Geral</h2>
      <div class="ornament-divider"><span>✦</span></div>
      <div class="coming-soon">
        <div class="cs-icon">📖</div>
        <h3>Os Pergaminhos Ainda Estão Sendo Escritos</h3>
        <p>A história do Continente de Kensword será registrada aqui à medida que o RPG avança.</p>
      </div>
    </div>
  </section>

  <section id="tab-content-races" class="tab-content">
    <div class="parchment-panel">
      <h2 class="section-title">🧬 Raças de Kensword</h2>
      <div class="ornament-divider"><span>✦</span></div>
      <div id="monster-note" class="monster-note">
        <strong>⚠ Nota — Estômago de Aço:</strong> Todos os monstros listados abaixo e Ghouls têm acesso à habilidade <em>Estômago de Aço</em>: comer carnes de monstros não causa enjoo nem contrai maldições.
      </div>
      <div class="races-grid" id="races-container"></div>
    </div>
  </section>

  <section id="tab-content-learn-abilities" class="tab-content">
    <div class="parchment-panel">
      <h2 class="section-title">🛡️ Habilidades para Aprender</h2>
      <div class="ornament-divider"><span>✦</span></div>
      <p style="text-align: center; font-style: italic; color: var(--ink); margin-bottom: 1.5rem; max-width: 600px; margin-left: auto; margin-right: auto;">
        Consulte as técnicas e habilidades comuns ou da sua raça/linhagem que você está apto a dominar no RPG e solicite aprovação dos mestres!
      </p>
      <div id="learn-abilities-container" style="display: flex; flex-direction: column; gap: 1.5rem; max-width: 900px; margin: 0 auto;">
        <!-- Injetado dinamicamente via js/char_manager.js -->
      </div>
    </div>
  </section>

  <section id="tab-content-map" class="tab-content">
    <div class="parchment-panel">
      <h2 class="section-title">🗺️ Localizações &amp; Mapa</h2>
      <div class="ornament-divider"><span>✦</span></div>
      <div class="map-container">
        <img src="Photos/Kensword_Map.jpeg" alt="Mapa do Continente de Kensword — Kensword Chronicles">
        <p style="font-family:'Cinzel',serif;font-size:0.8rem;color:var(--wood-plank);margin-top:0.8rem;letter-spacing:0.1em;">MAPA OFICIAL DE KENSWORD</p>
      </div>
      <div class="coming-soon"><p>Detalhes sobre cada continente e região serão adicionados em breve.</p></div>
    </div>
  </section>

  <section id="tab-content-elements" class="tab-content">
    <div class="parchment-panel">
      <h2 class="section-title">✨ Elementos & Aptidões</h2>
      <div class="ornament-divider"><span>✦</span></div>

      <p style="font-size:1.05rem; line-height:1.6; text-align:center;">Ao ter um elemento, você ganha uma criação e manipulação limitada dele. Para melhorá-la, você deve ter muitos pontos de magia ou até uma habilidade para isso.</p>
      <div style="text-align:center; font-family:'Cinzel',serif; font-size:1.1rem; margin:1rem 0; color:var(--red-wax);">
        <strong>100 Pontos [Magia] = 1 Metro [Alcance]</strong>
      </div>
      <p style="text-align:center; font-style:italic; margin-bottom:2rem;">Caso queira uma manipulação mais precisa, crie magias ou até mesmo habilidades baseadas no seu elemento.</p>

      <div class="monster-note" style="margin-bottom:2rem;">
        <h3 style="margin-top:0;font-family:'Cinzel',serif;">Aptidões</h3>
        <ul style="margin:0.5rem 0 1rem 1.2rem; font-size:0.95rem; line-height:1.5;">
          <li>Você pode ter diferentes tipos de aptidão dependendo do elemento.</li>
          <li>A aptidão define o nível de poder das suas magias, isso não faz diferença quando se trata de buffs e debuffs.</li>
          <li>Lembrando que você pode escolher qual Elemento tem qual aptidão, mas depois de feito, será permanente.</li>
          <li>Você pode melhorar a aptidão com treinos específicos.</li>
        </ul>
        <div style="display:flex; gap:1rem; flex-wrap:wrap; justify-content:space-between; background:rgba(0,0,0,0.05); padding:1rem; border-radius:6px;">
          <div style="flex:1; min-width:200px;">
            <strong style="color:var(--red-wax);">1 - Elementais [25/50/75/100]</strong><br>
            <ul style="list-style:none; padding:0; margin-top:0.3rem;">
              <li>Elemento 1 - 100%</li>
              <li>Elemento 2 - 75%</li>
              <li>Elemento 3 - 50%</li>
              <li>Elemento 4 - 25%</li>
            </ul>
          </div>
          <div style="flex:1; min-width:200px;">
            <strong style="color:var(--red-wax);">2 - Arcanos [0/25/50/50/100]</strong><br>
            <ul style="list-style:none; padding:0; margin-top:0.3rem;">
              <li>Elemento 1 - 50%</li>
              <li>Elemento 2 - 25%</li>
              <li>Dimensional - 50%</li>
              <li>Luz OU Sombra - 100% ou 0%</li>
            </ul>
          </div>
          <div style="flex:1; min-width:200px;">
            <strong style="color:var(--red-wax);">3 - Místicos</strong><br>
            <ul style="list-style:none; padding:0; margin-top:0.3rem;">
              <li>Sagrado OU Trevas - Mesma aptidão da versão arcana.</li>
            </ul>
          </div>
        </div>
      </div>

      <div id="dynamic-elements-container"></div>
    </div>
  </section>

  <section id="tab-content-characters" class="tab-content">
    <div class="parchment-panel">
      <h2 class="section-title">🧑‍🤝‍🧑 Personagens</h2>
      <div class="ornament-divider"><span>⚔️</span></div>
      <div id="characters-grid" class="characters-grid"></div>
    </div>
  </section>

  <section id="tab-content-npcs" class="tab-content">
    <div class="parchment-panel">
      <h2 class="section-title">🎭 NPCs</h2>
      <div class="ornament-divider"><span>⚔️</span></div>
      <div id="npcs-grid" class="characters-grid"></div>
    </div>
  </section>
  
  <section id="tab-content-profile" class="tab-content">
    <div class="parchment-panel">
      <h2 class="section-title">👤 Meu Perfil</h2>
      <div class="ornament-divider"><span>✦</span></div>
      <div style="display:flex; gap:2rem; flex-wrap:wrap; justify-content:center; align-items:flex-start;">
          <div style="text-align:center;">
              <div class="profile-avatar-container" style="position:relative; width:150px; height:150px; margin: 0 auto 1rem; cursor:pointer;" onclick="triggerAvatarUpdate()">
                  <img id="profile-user-avatar" src="Photos/demihuman.webp" style="width:100%; height:100%; border-radius:50%; object-fit:cover; border:2px solid var(--wood-plank);">
                  <div class="avatar-edit-overlay" style="position:absolute; bottom:0; right:0; background:var(--gold); border:2px solid var(--wood-dark); width:36px; height:36px; border-radius:50%; display:flex; align-items:center; justify-content:center; color:var(--wood-dark); font-size:1.1rem; box-shadow:0 2px 5px rgba(0,0,0,0.5); transition:all 0.2s;">
                      ✏️
                  </div>
              </div>
              <input type="file" id="profile-avatar-input" accept="image/*" style="display:none;" onchange="updateProfileAvatar(event)">
              <h3 id="profile-user-name" style="font-family:'Cinzel',serif; font-size:1.5rem; color:var(--ink);"></h3>
              <p><strong>Idade:</strong> <span id="profile-user-age"></span></p>
              <p><strong>Disponibilidade:</strong> <span id="profile-user-avail"></span></p>
              <div style="margin-top:1.5rem; padding:1rem; border:1px solid var(--gold); border-radius:8px; background:rgba(0,0,0,0.05);">
                  <h4 style="margin-top:0;">💰 Moedas Kens</h4>
                  <p style="font-style:italic; font-size:0.9rem;">Esse recurso será adicionado.</p>
              </div>
          </div>
          <div style="flex:1; min-width:300px;">
              <h3 style="font-family:'Cinzel',serif; border-bottom:1px solid var(--wood-plank); padding-bottom:0.5rem; margin-top:0;">Meus Personagens</h3>
              <div id="profile-my-characters" style="display:grid; grid-template-columns:1fr 1fr; gap:1rem; margin-bottom:2rem;"></div>
              
              <h3 style="font-family:'Cinzel',serif; border-bottom:1px solid var(--wood-plank); padding-bottom:0.5rem; margin-top:0;">Treinos na Semana</h3>
              <div style="display:flex; justify-content:space-between; align-items:center; padding:1rem; border:1px solid var(--wood-plank); border-radius:8px; background:var(--parchment-aged);">
                  <div style="font-size:1.2rem;"><strong>0</strong> treinos realizados</div>
                  <button class="form-submit-btn" style="width:auto; padding:0.5rem 1rem; margin-top:0; font-size:0.9rem;">Treinar Personagem</button>
              </div>

              <div class="profile-tabs-wrapper" style="margin-top: 1.5rem;">
                  <div id="profile-subtabs-nav" style="display: flex; gap: 0.5rem; border-bottom: 2px solid var(--wood-plank); padding-bottom: 0.3rem; margin-bottom: 1rem;">
                      <!-- Injetado via JS de acordo com o Role (Admin/Player) -->
                  </div>
                  
                  <!-- Conteúdo: Fichas Pendentes (Apenas Admin/Sub-Admin) -->
                  <div id="profile-subtab-pending" class="profile-subtab-content" style="display: none;">
                      <div id="profile-pending-fichas-container" class="characters-grid" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(130px, 1fr)); gap: 1rem; max-height: 350px; overflow-y: auto; padding: 0.5rem; border: 1px solid var(--wood-plank); border-radius: 8px; background: var(--parchment-aged);">
                          <!-- Fichas Pendentes em tempo real -->
                      </div>
                  </div>

                  <!-- Conteúdo: Notícias (Todos) -->
                  <div id="profile-subtab-noticias" class="profile-subtab-content" style="display: none;">
                      <!-- Criador de Comunicados (Admin/Sub-Admin) -->
                      <div id="admin-news-creator" style="display: none; border: 1px dashed var(--gold); border-radius: 8px; padding: 1rem; background: rgba(212,175,55,0.05); margin-bottom: 1rem; box-shadow: inset 0 0 10px rgba(0,0,0,0.15);">
                          <h4 style="margin: 0 0 0.8rem 0; font-family: 'Cinzel', serif; color: var(--gold); display: flex; align-items: center; justify-content: space-between; font-size: 0.95rem;">
                              ✍️ Escrever Nova Notícia
                              <button onclick="toggleNewsForm()" class="form-submit-btn" style="width: auto; margin-top: 0; font-size: 0.75rem; padding: 0.2rem 0.6rem;">Escrever</button>
                          </h4>
                          <div id="news-form-fields" style="display: none; flex-direction: column; gap: 0.8rem;">
                              <div class="field-group" style="margin-bottom: 0;">
                                  <input type="text" id="news-title-input" placeholder="Título da Notícia / Missão..." style="width:100%; padding:0.4rem; font-family:sans-serif; border:1px solid var(--wood-plank); border-radius:4px; background:var(--parchment); color:var(--ink);">
                              </div>
                              <div class="field-row" style="display: grid; grid-template-columns: 1fr 1fr; gap: 0.8rem;">
                                  <select id="news-category-input" style="width:100%; padding:0.4rem; font-family:sans-serif; border:1px solid var(--wood-plank); border-radius:4px; background:var(--parchment); color:var(--ink); font-size: 0.85rem;">
                                      <option value="Avisos Importantes">📢 Avisos Importantes</option>
                                      <option value="Novas Missões">⚔️ Novas Missões</option>
                                      <option value="Atualizações">⚙️ Atualizações</option>
                                  </select>
                                  <button onclick="publishNewsAnnouncement()" class="form-submit-btn" style="width: 100%; margin-top: 0; padding: 0.4rem; font-size: 0.85rem;">Publicar 📜</button>
                              </div>
                              <div class="field-group" style="margin-bottom: 0;">
                                  <textarea id="news-content-input" placeholder="Detalhes do aviso ou atualização..." style="width:100%; height:80px; padding:0.4rem; font-family:sans-serif; border:1px solid var(--wood-plank); border-radius:4px; background:var(--parchment); color:var(--ink); box-shadow:inset 0 1px 3px rgba(0,0,0,0.2);"></textarea>
                              </div>
                          </div>
                      </div>

                      <div id="profile-noticias-list" style="max-height: 250px; overflow-y: auto; border: 1px solid var(--wood-plank); border-radius: 8px; padding: 1rem; background: var(--parchment-aged); display: flex; flex-direction: column; gap: 0.6rem; box-shadow: inset 0 2px 5px rgba(0,0,0,0.15);">
                          <!-- Notícias ou Logs do Servidor -->
                      </div>
                  </div>

                  <!-- Conteúdo: Mensagens (Todos) -->
                  <div id="profile-subtab-mensagens" class="profile-subtab-content" style="display: none;">
                      <div id="profile-mensagens-list" style="max-height: 250px; overflow-y: auto; border: 1px solid var(--wood-plank); border-radius: 8px; padding: 1rem; background: var(--parchment-aged); display: flex; flex-direction: column; gap: 0.6rem; box-shadow: inset 0 2px 5px rgba(0,0,0,0.15);">
                          <!-- Mensagens privadas / Caixa de entrada -->
                      </div>
                  </div>
              </div>
          </div>
      </div>
    </div>
  </section>

  <section id="tab-content-pending" class="tab-content">
    <div class="parchment-panel">
      <h2 class="section-title" style="color:var(--red-wax);">📋 Fichas Pendentes</h2>
      <div class="ornament-divider"><span>⚔️</span></div>
      <p style="text-align:center; margin-bottom:1.5rem; font-style:italic;">Fichas de aventureiros aguardando aprovação dos mestres para entrar na Guilda.</p>
      <div id="pending-characters-grid" class="characters-grid"></div>
    </div>
  </section>

  <section id="tab-content-orgs" class="tab-content">
    <div class="parchment-panel">
      <h2 class="section-title">🏰 Organizações</h2>
      <div class="ornament-divider"><span>✦</span></div>
      <div class="coming-soon">
        <div class="cs-icon">🏛️</div>
        <h3>Facções e Guildas</h3>
        <p>Igreja Dourada, Igreja do Fogo Eterno, Guilda de Aventureiros e outras serão detalhadas aqui.</p>
      </div>
    </div>
  </section>

  <section id="tab-content-monsters" class="tab-content">
    <div class="parchment-panel">
      <h2 class="section-title">👾 Bestiário</h2>
      <div class="ornament-divider"><span>✦</span></div>
      <div class="coming-soon">
        <div class="cs-icon">🐉</div>
        <h3>Bestiário de Kensword</h3>
        <p>Goblins, Kobolds e outras criaturas serão catalogados aqui.</p>
      </div>
    </div>
  </section>
`;
