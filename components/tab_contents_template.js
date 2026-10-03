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
      <h2 class="section-title">✨ Elementos</h2>
      <div class="ornament-divider"><span>✦</span></div>

      <p style="font-size:1.05rem; line-height:1.6; text-align:center;">Ao ter um elemento, você ganha uma criação e manipulação limitada do seu elemento, para melhorá-lo, você deve ter muitos pontos de magia ou até uma habilidade própria.</p>
      <div style="text-align:center; font-family:'Cinzel',serif; font-size:1.15rem; margin:1.2rem 0; color:var(--red-wax);">
        <strong>1 Ponto [Magia] = 1 Metro [Alcance]</strong>
      </div>
      <p style="text-align:center; font-style:italic; margin-bottom:2rem; color:var(--ink-light);">Caso queira uma manipulação mais precisa, crie magias ou até mesmo habilidades baseadas no seu elemento.</p>

      <div id="dynamic-elements-container"></div>
    </div>
  </section>

  <section id="tab-content-nivelamento" class="tab-content">
    <div class="parchment-panel">
      <h2 class="section-title">📈 Nivelamento</h2>
      <div class="ornament-divider"><span>✦</span></div>

      <!-- Introdução -->
      <p style="font-size:1.05rem; line-height:1.7; text-align:center; max-width:720px; margin:0 auto 0.5rem;">
        Você começa com <strong>20 pontos base</strong> para distribuir livremente entre seus atributos.
        Para evoluir, você precisará subir de nível — e para subir de nível... basta fazer missões e treinos!
      </p>
      <div style="text-align:center; font-family:'Cinzel',serif; font-size:1.1rem; margin:1.2rem 0 2.5rem; color:var(--red-wax);">
        <strong>A cada nível, você ganha 10 pontos para distribuir.</strong>
      </div>

      <!-- Grid de duas colunas: Níveis + Atributos -->
      <div style="display:grid; grid-template-columns:1fr 1fr; gap:2rem; align-items:start; max-width:1000px; margin:0 auto;">

        <!-- COLUNA ESQUERDA: Níveis e XP -->
        <div>
          <h3 class="section-title" style="font-size:1.4rem; text-align:left; margin-bottom:1.2rem;">⚔️ Tabela de Níveis</h3>
          <div style="border:1px solid var(--wood-plank); border-radius:10px; overflow:hidden; box-shadow:0 4px 15px rgba(0,0,0,0.25);">
            <!-- Cabeçalho -->
            <div style="background:rgba(212,175,55,0.15); display:grid; grid-template-columns:1fr 1fr; padding:0.7rem 1.2rem; font-family:'Cinzel',serif; font-size:0.85rem; color:var(--gold); font-weight:bold; border-bottom:1px solid var(--wood-plank);">
              <span>NÍVEL</span>
              <span>XP NECESSÁRIO</span>
            </div>
            <!-- Linhas de nível -->
            <div id="level-table-rows" style="max-height:460px; overflow-y:auto;">
              <!-- Gerado dinamicamente pelo JS abaixo -->
            </div>
          </div>
          <p style="font-size:0.8rem; color:var(--ink-light); font-style:italic; margin-top:0.7rem; text-align:center;">
            A fórmula é: <strong>Lvl N → N × 100 XP</strong>
          </p>
        </div>

        <!-- COLUNA DIREITA: Atributos e suas conversões -->
        <div>
          <h3 class="section-title" style="font-size:1.4rem; text-align:left; margin-bottom:1.2rem;">🧮 Sistema de Atributos</h3>

          <!-- Força -->
          <div class="nivel-attr-card" style="border:1px solid var(--wood-plank); border-left:4px solid #e05252; border-radius:8px; padding:1rem 1.2rem; background:rgba(0,0,0,0.22); margin-bottom:1rem; box-shadow:0 3px 8px rgba(0,0,0,0.2);">
            <div style="font-family:'Cinzel',serif; font-size:1.15rem; color:#e05252; font-weight:bold; margin-bottom:0.5rem;">
              ⚔️ Força
            </div>
            <div style="font-size:0.83rem; color:var(--gold); font-style:italic; margin-bottom:0.5rem;">1 Ponto de Atributo =</div>
            <div style="display:flex; flex-direction:column; gap:0.25rem;">
              <div style="font-size:0.9rem; color:var(--ink); display:flex; align-items:center; gap:0.5rem;">
                <span style="color:#e05252;">▸</span> <strong>10 Kg</strong>&nbsp;Força Física
              </div>
            </div>
          </div>

          <!-- Resistência -->
          <div class="nivel-attr-card" style="border:1px solid var(--wood-plank); border-left:4px solid #5285e0; border-radius:8px; padding:1rem 1.2rem; background:rgba(0,0,0,0.22); margin-bottom:1rem; box-shadow:0 3px 8px rgba(0,0,0,0.2);">
            <div style="font-family:'Cinzel',serif; font-size:1.15rem; color:#5285e0; font-weight:bold; margin-bottom:0.5rem;">
              🛡️ Resistência
            </div>
            <div style="font-size:0.83rem; color:var(--gold); font-style:italic; margin-bottom:0.5rem;">1 Ponto de Atributo =</div>
            <div style="display:flex; flex-direction:column; gap:0.28rem;">
              <div style="font-size:0.9rem; color:var(--ink); display:flex; align-items:center; gap:0.5rem;"><span style="color:#5285e0;">▸</span> <strong>20 Kg</strong>&nbsp;Resistência Física</div>
              <div style="font-size:0.9rem; color:var(--ink); display:flex; align-items:center; gap:0.5rem;"><span style="color:#5285e0;">▸</span> <strong>20 Kg</strong>&nbsp;Resistência Mágica</div>
              <div style="font-size:0.9rem; color:var(--ink); display:flex; align-items:center; gap:0.5rem;"><span style="color:#5285e0;">▸</span> <strong>+1°C</strong>&nbsp;Resistência ao Calor</div>
              <div style="font-size:0.9rem; color:var(--ink); display:flex; align-items:center; gap:0.5rem;"><span style="color:#5285e0;">▸</span> <strong>-2°C</strong>&nbsp;Resistência ao Frio</div>
            </div>
          </div>

          <!-- Velocidade -->
          <div class="nivel-attr-card" style="border:1px solid var(--wood-plank); border-left:4px solid #52d4e0; border-radius:8px; padding:1rem 1.2rem; background:rgba(0,0,0,0.22); margin-bottom:1rem; box-shadow:0 3px 8px rgba(0,0,0,0.2);">
            <div style="font-family:'Cinzel',serif; font-size:1.15rem; color:#52d4e0; font-weight:bold; margin-bottom:0.5rem;">
              💨 Velocidade
            </div>
            <div style="display:flex; flex-direction:column; gap:0.28rem;">
              <div style="font-size:0.83rem; color:var(--gold); font-style:italic; margin-bottom:0.2rem;">1 Ponto =</div>
              <div style="font-size:0.9rem; color:var(--ink); display:flex; align-items:center; gap:0.5rem;"><span style="color:#52d4e0;">▸</span> <strong>1 Km/h</strong>&nbsp;Sentidos</div>
              <div style="font-size:0.83rem; color:var(--gold); font-style:italic; margin:0.4rem 0 0.2rem;">2 Pontos =</div>
              <div style="font-size:0.9rem; color:var(--ink); display:flex; align-items:center; gap:0.5rem;"><span style="color:#52d4e0;">▸</span> <strong>1 Km/h</strong>&nbsp;Corrida</div>
            </div>
          </div>

          <!-- Magia -->
          <div class="nivel-attr-card" style="border:1px solid var(--wood-plank); border-left:4px solid #a05ee0; border-radius:8px; padding:1rem 1.2rem; background:rgba(0,0,0,0.22); margin-bottom:0; box-shadow:0 3px 8px rgba(0,0,0,0.2);">
            <div style="font-family:'Cinzel',serif; font-size:1.15rem; color:#a05ee0; font-weight:bold; margin-bottom:0.5rem;">
              ✨ Magia
            </div>
            <div style="display:flex; flex-direction:column; gap:0.28rem;">
              <div style="font-size:0.83rem; color:var(--gold); font-style:italic; margin-bottom:0.2rem;">1 Ponto =</div>
              <div style="font-size:0.9rem; color:var(--ink); display:flex; align-items:center; gap:0.5rem;"><span style="color:#a05ee0;">▸</span> <strong>10 Kg</strong>&nbsp;Força Mágica</div>
              <div style="font-size:0.9rem; color:var(--ink); display:flex; align-items:center; gap:0.5rem;"><span style="color:#a05ee0;">▸</span> <strong>2</strong>&nbsp;Mana Máx.</div>
              <div style="font-size:0.83rem; color:var(--gold); font-style:italic; margin:0.4rem 0 0.2rem;">4 Pontos =</div>
              <div style="font-size:0.9rem; color:var(--ink); display:flex; align-items:center; gap:0.5rem;"><span style="color:#a05ee0;">▸</span> <strong>1 Km/h</strong>&nbsp;Velocidade de Magia</div>
            </div>
          </div>

        </div><!-- fim coluna direita -->
      </div><!-- fim grid -->

      <!-- ======================== SISTEMA DE TREINOS ======================== -->
      <div class="ornament-divider" style="margin: 3.5rem 0 2rem;"><span>✦ 🏋️ ✦</span></div>

      <h3 class="section-title" style="font-size:1.6rem; margin-bottom:0.6rem;">🏋️ Sistema de Treinos</h3>
      <p style="text-align:center; font-style:italic; color:var(--ink-light); margin-bottom:2.5rem; font-size:0.95rem;">
        Treine seu personagem para ganhar XP, pontos de atributos e evoluir suas perícias.
      </p>

      <div style="display:grid; grid-template-columns:repeat(auto-fill, minmax(240px, 1fr)); gap:1.5rem; max-width:1000px; margin:0 auto;">

        <!-- Treino Solo -->
        <div style="border:1px solid var(--wood-plank); border-top:3px solid #f0a050; border-radius:10px; padding:1.3rem; background:rgba(0,0,0,0.25); box-shadow:0 4px 12px rgba(0,0,0,0.25); display:flex; flex-direction:column; gap:0.9rem;">
          <div>
            <div style="font-family:'Cinzel',serif; font-size:1.2rem; color:#f0a050; font-weight:bold; margin-bottom:0.3rem;">⚔️ Treino Solo</div>
            <div style="font-size:0.88rem; color:var(--ink-light); line-height:1.5;">Treino para fortalecer seu personagem.</div>
          </div>
          <div style="display:flex; flex-direction:column; gap:0.35rem;">
            <div style="font-size:0.8rem; color:#ccc; display:flex; align-items:center; gap:0.5rem;">
              <span style="color:#f0a050;">📝</span> <span><strong>Mínimo:</strong> 100 palavras</span>
            </div>
            <div style="font-size:0.8rem; color:#ccc; display:flex; align-items:center; gap:0.5rem;">
              <span style="color:#f0a050;">🔁</span> <span><strong>Limite:</strong> 3 vezes por semana</span>
            </div>
          </div>
          <div style="border-top:1px solid rgba(255,255,255,0.08); padding-top:0.8rem;">
            <div style="font-family:'Cinzel',serif; font-size:0.75rem; color:var(--gold); letter-spacing:0.08em; margin-bottom:0.5rem;">RECOMPENSAS</div>
            <div style="display:flex; flex-direction:column; gap:0.3rem;">
              <div style="font-size:0.88rem; color:#8bc34a; display:flex; align-items:center; gap:0.5rem;"><span>✅</span> <strong>+10 XP</strong> (Level)</div>
              <div style="font-size:0.88rem; color:#8bc34a; display:flex; align-items:center; gap:0.5rem;"><span>✅</span> <strong>+1 Ponto</strong> para distribuir</div>
            </div>
          </div>
        </div>

        <!-- Treino em Dupla -->
        <div style="border:1px solid var(--wood-plank); border-top:3px solid #52d4e0; border-radius:10px; padding:1.3rem; background:rgba(0,0,0,0.25); box-shadow:0 4px 12px rgba(0,0,0,0.25); display:flex; flex-direction:column; gap:0.9rem;">
          <div>
            <div style="font-family:'Cinzel',serif; font-size:1.2rem; color:#52d4e0; font-weight:bold; margin-bottom:0.3rem;">🤝 Treino em Dupla</div>
            <div style="font-size:0.88rem; color:var(--ink-light); line-height:1.5;">Treino que beneficia os dois lados.</div>
          </div>
          <div style="display:flex; flex-direction:column; gap:0.35rem;">
            <div style="font-size:0.8rem; color:#ccc; display:flex; align-items:center; gap:0.5rem;">
              <span style="color:#52d4e0;">📝</span> <span><strong>Mínimo:</strong> 5 cenas por player</span>
            </div>
            <div style="font-size:0.8rem; color:#ccc; display:flex; align-items:center; gap:0.5rem;">
              <span style="color:#52d4e0;">🔁</span> <span><strong>Limite:</strong> 2 vezes por semana</span>
            </div>
          </div>
          <div style="border-top:1px solid rgba(255,255,255,0.08); padding-top:0.8rem;">
            <div style="font-family:'Cinzel',serif; font-size:0.75rem; color:var(--gold); letter-spacing:0.08em; margin-bottom:0.5rem;">RECOMPENSAS</div>
            <div style="display:flex; flex-direction:column; gap:0.3rem;">
              <div style="font-size:0.88rem; color:#8bc34a; display:flex; align-items:center; gap:0.5rem;"><span>✅</span> <strong>+30 XP</strong> (Level)</div>
              <div style="font-size:0.88rem; color:#8bc34a; display:flex; align-items:center; gap:0.5rem;"><span>✅</span> <strong>+3 Pontos</strong> para distribuir</div>
            </div>
          </div>
        </div>

        <!-- Treino de Perícia -->
        <div style="border:1px solid var(--wood-plank); border-top:3px solid #a05ee0; border-radius:10px; padding:1.3rem; background:rgba(0,0,0,0.25); box-shadow:0 4px 12px rgba(0,0,0,0.25); display:flex; flex-direction:column; gap:0.9rem;">
          <div>
            <div style="font-family:'Cinzel',serif; font-size:1.2rem; color:#a05ee0; font-weight:bold; margin-bottom:0.3rem;">📚 Treino de Perícia</div>
            <div style="font-size:0.88rem; color:var(--ink-light); line-height:1.5;">Para melhorar suas habilidades. É o único meio de aprender perícias sem ser em missões.</div>
          </div>
          <div style="display:flex; flex-direction:column; gap:0.35rem;">
            <div style="font-size:0.8rem; color:#ccc; display:flex; align-items:center; gap:0.5rem;">
              <span style="color:#a05ee0;">📝</span> <span><strong>Mínimo:</strong> 100 palavras</span>
            </div>
            <div style="font-size:0.8rem; color:#ccc; display:flex; align-items:center; gap:0.5rem;">
              <span style="color:#a05ee0;">🔁</span> <span><strong>Limite:</strong> 1 vez por semana por perícia</span>
            </div>
          </div>
          <div style="border-top:1px solid rgba(255,255,255,0.08); padding-top:0.8rem;">
            <div style="font-family:'Cinzel',serif; font-size:0.75rem; color:var(--gold); letter-spacing:0.08em; margin-bottom:0.5rem;">RECOMPENSAS</div>
            <div style="display:flex; flex-direction:column; gap:0.3rem;">
              <div style="font-size:0.88rem; color:#8bc34a; display:flex; align-items:center; gap:0.5rem;"><span>✅</span> <strong>+10 XP</strong> (Level)</div>
              <div style="font-size:0.88rem; color:#8bc34a; display:flex; align-items:center; gap:0.5rem;"><span>✅</span> <strong>+1 Nível</strong> na Perícia Treinada</div>
              <div style="font-size:0.88rem; color:#8bc34a; display:flex; align-items:center; gap:0.5rem;"><span>✅</span> <strong>+1 Ponto</strong> para distribuir</div>
            </div>
          </div>
        </div>

        <!-- Treino de Magia -->
        <div style="border:1px solid var(--wood-plank); border-top:3px solid #e05252; border-radius:10px; padding:1.3rem; background:rgba(0,0,0,0.25); box-shadow:0 4px 12px rgba(0,0,0,0.25); display:flex; flex-direction:column; gap:0.9rem;">
          <div>
            <div style="font-family:'Cinzel',serif; font-size:1.2rem; color:#e05252; font-weight:bold; margin-bottom:0.3rem;">✨ Treino de Magia</div>
            <div style="font-size:0.88rem; color:var(--ink-light); line-height:1.5;">Para criar, treinar ou melhorar magias. Existem magias que só podem ser obtidas com NPCs.</div>
          </div>
          <div style="display:flex; flex-direction:column; gap:0.35rem;">
            <div style="font-size:0.8rem; color:#ccc; display:flex; align-items:center; gap:0.5rem;">
              <span style="color:#e05252;">🔁</span> <span><strong>Limite:</strong> 2 vezes por semana</span>
            </div>
          </div>
          <div style="border-top:1px solid rgba(255,255,255,0.08); padding-top:0.8rem;">
            <div style="font-family:'Cinzel',serif; font-size:0.75rem; color:var(--gold); letter-spacing:0.08em; margin-bottom:0.5rem;">RECOMPENSAS</div>
            <div style="display:flex; flex-direction:column; gap:0.3rem;">
              <div style="font-size:0.88rem; color:#8bc34a; display:flex; align-items:center; gap:0.5rem;"><span>✅</span> <strong>1 Magia</strong> (se foi treinada)</div>
              <div style="font-size:0.88rem; color:#8bc34a; display:flex; align-items:center; gap:0.5rem;"><span>✅</span> <strong>+1 Ponto</strong> de Magia</div>
            </div>
          </div>
        </div>

      </div><!-- fim grid treinos -->

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
