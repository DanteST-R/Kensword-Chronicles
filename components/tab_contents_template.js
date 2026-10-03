window.KENSWORD_TEMPLATES = window.KENSWORD_TEMPLATES || {};
window.KENSWORD_TEMPLATES.tabContents = `
  <section id="tab-content-history" class="tab-content active">
    <div class="parchment-panel">
      <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:1rem; margin-bottom:0.5rem;">
        <h2 class="section-title" style="margin:0;">📜 Histórias &amp; Missões</h2>
        <div id="history-admin-actions"></div>
      </div>
      <div class="ornament-divider"><span>✦</span></div>
      <p style="text-align:center; font-style:italic; color:var(--ink-light); margin-bottom:1.8rem;">
        Crônicas, eventos de andar e missões oficiais do Continente de Kensword registradas pela Guilda.
      </p>
      <div id="history-container">
        <!-- Injetado dinamicamente via js/world_content.js -->
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
        <img src="Photos/Kensword_Map.jpeg?v=2" alt="Mapa Oficial do Continente de Kensword">
        <p style="font-family:'Cinzel',serif;font-size:0.85rem;color:var(--gold);margin-top:0.8rem;letter-spacing:0.12em;">MAPA OFICIAL DO CONTINENTE DE KENSWORD</p>
      </div>
      <!-- Navegação de Sub-Abas de Regiões -->
      <div class="location-subtabs-nav">
        <button class="location-subtab-btn active" id="location-subtab-btn-balistia" onclick="showLocationSubtab('balistia')">
          🏰 Balistia
        </button>
      </div>

      <!-- Conteúdo da Sub-Aba: Balistia -->
      <div id="location-subtab-balistia" class="location-subtab-content" style="display:block; animation:fadeIn 0.3s ease;">
        
        <div style="text-align:center; margin-bottom:2rem;">
          <h3 style="font-family:'Cinzel Decorative',serif; font-size:1.6rem; color:var(--gold-bright); margin-bottom:0.4rem;">
            🏰 Reino de Balistia
          </h3>
          <p style="font-style:italic; color:var(--ink-light); font-size:0.95rem;">
            A grande metrópole central do continente. Conheça as oportunidades imobiliárias e comerciais da cidade.
          </p>
        </div>

        <div style="background:rgba(212,167,84,0.08); border-left:4px solid var(--gold); border-radius:8px; padding:1.2rem 1.5rem; margin-bottom:2.5rem; max-width:980px; margin-left:auto; margin-right:auto;">
          <h4 style="font-family:'Cinzel',serif; color:var(--gold-bright); font-size:1.15rem; margin-bottom:0.4rem; display:flex; align-items:center; gap:0.5rem;">
            <span>💰</span> Moradias e Investimentos
          </h4>
          <p style="font-size:0.92rem; color:var(--ink); line-height:1.6;">
            Adquira propriedades residenciais ou invista em comércios e estabelecimentos de serviços para gerar renda semanal para seu personagem ou grupo.
          </p>
        </div>

        <!-- SEÇÃO 1: ESTABELECIMENTOS BAIRRO PLEBEU -->
        <div style="margin-bottom:3rem;">
          <div style="display:flex; align-items:center; gap:0.6rem; margin-bottom:1.2rem; border-bottom:1px solid rgba(212,167,84,0.25); padding-bottom:0.5rem;">
            <span style="font-size:1.4rem;">🌾</span>
            <h4 style="font-family:'Cinzel',serif; font-size:1.25rem; color:#e09855;">Estabelecimentos Bairro Plebeu</h4>
          </div>

          <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(260px, 1fr)); gap:1.2rem;">
            
            <!-- Casa -->
            <div style="background:rgba(0,0,0,0.45); border:1px solid var(--wood-plank); border-top:3px solid #e09855; border-radius:8px; padding:1.1rem; display:flex; flex-direction:column; justify-content:space-between; box-shadow:0 4px 12px rgba(0,0,0,0.4);">
              <div>
                <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:0.6rem;">
                  <span style="font-family:'Cinzel',serif; font-weight:bold; font-size:1.1rem; color:var(--gold-bright);">🏚️ Casa</span>
                  <span style="background:rgba(212,167,84,0.18); border:1px solid rgba(212,167,84,0.4); color:var(--gold-bright); padding:2px 8px; border-radius:4px; font-size:0.85rem; font-weight:bold;">5.000 moedas</span>
                </div>
                <p style="font-size:0.9rem; color:var(--ink); line-height:1.5;">Casa simples, 2 quartos, 1 cozinha e 1 sala.</p>
              </div>
            </div>

            <!-- Casarão -->
            <div style="background:rgba(0,0,0,0.45); border:1px solid var(--wood-plank); border-top:3px solid #e09855; border-radius:8px; padding:1.1rem; display:flex; flex-direction:column; justify-content:space-between; box-shadow:0 4px 12px rgba(0,0,0,0.4);">
              <div>
                <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:0.6rem;">
                  <span style="font-family:'Cinzel',serif; font-weight:bold; font-size:1.1rem; color:var(--gold-bright);">💒 Casarão</span>
                  <span style="background:rgba(212,167,84,0.18); border:1px solid rgba(212,167,84,0.4); color:var(--gold-bright); padding:2px 8px; border-radius:4px; font-size:0.85rem; font-weight:bold;">10.000 moedas</span>
                </div>
                <p style="font-size:0.9rem; color:var(--ink); line-height:1.5;">Casa de 3 quartos, 1 cozinha e 2 salas.</p>
              </div>
            </div>

            <!-- Taverna -->
            <div style="background:rgba(0,0,0,0.45); border:1px solid var(--wood-plank); border-top:3px solid #f0a050; border-radius:8px; padding:1.1rem; display:flex; flex-direction:column; justify-content:space-between; box-shadow:0 4px 12px rgba(0,0,0,0.4);">
              <div>
                <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:0.6rem;">
                  <span style="font-family:'Cinzel',serif; font-weight:bold; font-size:1.1rem; color:var(--gold-bright);">🍻 Taverna</span>
                  <span style="background:rgba(212,167,84,0.18); border:1px solid rgba(212,167,84,0.4); color:var(--gold-bright); padding:2px 8px; border-radius:4px; font-size:0.85rem; font-weight:bold;">7.500 moedas</span>
                </div>
                <div style="font-size:0.9rem; color:#8bc34a; font-weight:bold; margin-bottom:0.4rem;">💰 Rende 500 moedas / semana</div>
                <div style="font-size:0.85rem; color:var(--ink-light);">👥 <strong>Mínimo:</strong> 2 funcionários</div>
              </div>
            </div>

            <!-- Restaurante -->
            <div style="background:rgba(0,0,0,0.45); border:1px solid var(--wood-plank); border-top:3px solid #f0a050; border-radius:8px; padding:1.1rem; display:flex; flex-direction:column; justify-content:space-between; box-shadow:0 4px 12px rgba(0,0,0,0.4);">
              <div>
                <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:0.6rem;">
                  <span style="font-family:'Cinzel',serif; font-weight:bold; font-size:1.1rem; color:var(--gold-bright);">🍝 Restaurante</span>
                  <span style="background:rgba(212,167,84,0.18); border:1px solid rgba(212,167,84,0.4); color:var(--gold-bright); padding:2px 8px; border-radius:4px; font-size:0.85rem; font-weight:bold;">7.500 moedas</span>
                </div>
                <div style="font-size:0.9rem; color:#8bc34a; font-weight:bold; margin-bottom:0.4rem;">💰 Rende 500 moedas / semana</div>
                <div style="font-size:0.85rem; color:var(--ink-light);">👥 <strong>Mínimo:</strong> 2 funcionários</div>
              </div>
            </div>

            <!-- Comércio -->
            <div style="background:rgba(0,0,0,0.45); border:1px solid var(--wood-plank); border-top:3px solid #52d4e0; border-radius:8px; padding:1.1rem; display:flex; flex-direction:column; justify-content:space-between; box-shadow:0 4px 12px rgba(0,0,0,0.4);">
              <div>
                <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:0.6rem;">
                  <span style="font-family:'Cinzel',serif; font-weight:bold; font-size:1.1rem; color:var(--gold-bright);">🏪 Comércio</span>
                  <span style="background:rgba(212,167,84,0.18); border:1px solid rgba(212,167,84,0.4); color:var(--gold-bright); padding:2px 8px; border-radius:4px; font-size:0.85rem; font-weight:bold;">5.000 moedas</span>
                </div>
                <div style="font-size:0.9rem; color:#8bc34a; font-weight:bold; margin-bottom:0.4rem;">💰 Rende 250 moedas / semana</div>
                <div style="font-size:0.85rem; color:var(--ink-light);">👤 <strong>Mínimo:</strong> 1 funcionário</div>
              </div>
            </div>

          </div>
        </div>

        <!-- SEÇÃO 2: MORADIAS BAIRRO NOBRE -->
        <div style="margin-bottom:3rem;">
          <div style="display:flex; align-items:center; gap:0.6rem; margin-bottom:1.2rem; border-bottom:1px solid rgba(212,167,84,0.25); padding-bottom:0.5rem;">
            <span style="font-size:1.4rem;">👑</span>
            <h4 style="font-family:'Cinzel',serif; font-size:1.25rem; color:var(--gold-bright);">Moradias Bairro Nobre</h4>
          </div>

          <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(260px, 1fr)); gap:1.2rem;">
            
            <!-- Casa de Luxo -->
            <div style="background:rgba(0,0,0,0.45); border:1px solid var(--wood-plank); border-top:3px solid var(--gold); border-radius:8px; padding:1.1rem; display:flex; flex-direction:column; justify-content:space-between; box-shadow:0 4px 12px rgba(0,0,0,0.4);">
              <div>
                <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:0.6rem;">
                  <span style="font-family:'Cinzel',serif; font-weight:bold; font-size:1.1rem; color:var(--gold-bright);">⛪ Casa de Luxo</span>
                  <span style="background:rgba(212,167,84,0.22); border:1px solid var(--gold); color:var(--gold-bright); padding:2px 8px; border-radius:4px; font-size:0.85rem; font-weight:bold;">15.000 moedas</span>
                </div>
                <p style="font-size:0.9rem; color:var(--ink); line-height:1.5;">Uma casa linda de 5 cômodos!</p>
              </div>
            </div>

            <!-- Casarão de Luxo -->
            <div style="background:rgba(0,0,0,0.45); border:1px solid var(--wood-plank); border-top:3px solid var(--gold); border-radius:8px; padding:1.1rem; display:flex; flex-direction:column; justify-content:space-between; box-shadow:0 4px 12px rgba(0,0,0,0.4);">
              <div>
                <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:0.6rem;">
                  <span style="font-family:'Cinzel',serif; font-weight:bold; font-size:1.1rem; color:var(--gold-bright);">🏨 Casarão de Luxo</span>
                  <span style="background:rgba(212,167,84,0.22); border:1px solid var(--gold); color:var(--gold-bright); padding:2px 8px; border-radius:4px; font-size:0.85rem; font-weight:bold;">20.000 moedas</span>
                </div>
                <p style="font-size:0.9rem; color:var(--ink); line-height:1.5;">Um casarão top de 10 cômodos!</p>
              </div>
            </div>

            <!-- Mansão -->
            <div style="background:rgba(0,0,0,0.45); border:1px solid var(--wood-plank); border-top:3px solid #ffdd88; border-radius:8px; padding:1.1rem; display:flex; flex-direction:column; justify-content:space-between; box-shadow:0 4px 12px rgba(0,0,0,0.4);">
              <div>
                <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:0.6rem;">
                  <span style="font-family:'Cinzel',serif; font-weight:bold; font-size:1.1rem; color:var(--gold-bright);">🏫 Mansão</span>
                  <span style="background:rgba(212,167,84,0.22); border:1px solid var(--gold); color:var(--gold-bright); padding:2px 8px; border-radius:4px; font-size:0.85rem; font-weight:bold;">30.000 moedas</span>
                </div>
                <p style="font-size:0.9rem; color:var(--ink); line-height:1.5;">Uma mansão espetacular com acabamento real!</p>
              </div>
            </div>

            <!-- Taverna de Luxo -->
            <div style="background:rgba(0,0,0,0.45); border:1px solid var(--wood-plank); border-top:3px solid var(--gold); border-radius:8px; padding:1.1rem; display:flex; flex-direction:column; justify-content:space-between; box-shadow:0 4px 12px rgba(0,0,0,0.4);">
              <div>
                <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:0.6rem;">
                  <span style="font-family:'Cinzel',serif; font-weight:bold; font-size:1.1rem; color:var(--gold-bright);">🍻 Taverna de Luxo</span>
                  <span style="background:rgba(212,167,84,0.22); border:1px solid var(--gold); color:var(--gold-bright); padding:2px 8px; border-radius:4px; font-size:0.85rem; font-weight:bold;">15.000 moedas</span>
                </div>
                <div style="font-size:0.9rem; color:#8bc34a; font-weight:bold; margin-bottom:0.4rem;">💰 Rende 700 moedas / semana</div>
                <div style="font-size:0.85rem; color:var(--ink-light);">👥 <strong>Mínimo:</strong> 3 funcionários</div>
              </div>
            </div>

            <!-- Restaurante de Luxo -->
            <div style="background:rgba(0,0,0,0.45); border:1px solid var(--wood-plank); border-top:3px solid var(--gold); border-radius:8px; padding:1.1rem; display:flex; flex-direction:column; justify-content:space-between; box-shadow:0 4px 12px rgba(0,0,0,0.4);">
              <div>
                <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:0.6rem;">
                  <span style="font-family:'Cinzel',serif; font-weight:bold; font-size:1.1rem; color:var(--gold-bright);">🍝 Restaurante de Luxo</span>
                  <span style="background:rgba(212,167,84,0.22); border:1px solid var(--gold); color:var(--gold-bright); padding:2px 8px; border-radius:4px; font-size:0.85rem; font-weight:bold;">15.000 moedas</span>
                </div>
                <div style="font-size:0.9rem; color:#8bc34a; font-weight:bold; margin-bottom:0.4rem;">💰 Rende 700 moedas / semana</div>
                <div style="font-size:0.85rem; color:var(--ink-light);">👥 <strong>Mínimo:</strong> 3 funcionários</div>
              </div>
            </div>

            <!-- Comércio de Luxo -->
            <div style="background:rgba(0,0,0,0.45); border:1px solid var(--wood-plank); border-top:3px solid var(--gold); border-radius:8px; padding:1.1rem; display:flex; flex-direction:column; justify-content:space-between; box-shadow:0 4px 12px rgba(0,0,0,0.4);">
              <div>
                <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:0.6rem;">
                  <span style="font-family:'Cinzel',serif; font-weight:bold; font-size:1.1rem; color:var(--gold-bright);">🏪 Comércio de Luxo</span>
                  <span style="background:rgba(212,167,84,0.22); border:1px solid var(--gold); color:var(--gold-bright); padding:2px 8px; border-radius:4px; font-size:0.85rem; font-weight:bold;">10.000 moedas</span>
                </div>
                <div style="font-size:0.9rem; color:#8bc34a; font-weight:bold; margin-bottom:0.4rem;">💰 Rende 500 moedas / semana</div>
                <div style="font-size:0.85rem; color:var(--ink-light);">👥 <strong>Mínimo:</strong> 2 funcionários</div>
              </div>
            </div>

          </div>
        </div>

        <!-- SEÇÃO 3: GRANDES INSTITUIÇÕES -->
        <div style="margin-bottom:2.5rem;">
          <div style="display:flex; align-items:center; gap:0.6rem; margin-bottom:1.2rem; border-bottom:1px solid rgba(212,167,84,0.25); padding-bottom:0.5rem;">
            <span style="font-size:1.4rem;">🏛️</span>
            <h4 style="font-family:'Cinzel',serif; font-size:1.25rem; color:#52d4e0;">Grandes Instituições & Serviços Públicos</h4>
          </div>

          <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(320px, 1fr)); gap:1.5rem;">
            
            <!-- Escola -->
            <div style="background:rgba(0,0,0,0.5); border:1px solid var(--wood-plank); border-left:4px solid #a05ee0; border-radius:8px; padding:1.3rem; box-shadow:0 4px 14px rgba(0,0,0,0.45); display:flex; flex-direction:column; gap:0.8rem;">
              <div style="display:flex; justify-content:space-between; align-items:center;">
                <span style="font-family:'Cinzel',serif; font-weight:bold; font-size:1.2rem; color:#a05ee0;">📚 Escola</span>
                <span style="background:rgba(160,94,224,0.2); border:1px solid #a05ee0; color:var(--gold-bright); padding:3px 10px; border-radius:4px; font-weight:bold; font-size:0.9rem;">10.000 moedas</span>
              </div>
              <p style="font-size:0.92rem; color:var(--ink); line-height:1.5;">
                Uma escola pequena para aprender! Ela prepara funcionários capacitados para o reino.
              </p>
              <div style="background:rgba(0,0,0,0.35); border-radius:6px; padding:0.8rem; border:1px solid rgba(255,255,255,0.06); display:flex; flex-direction:column; gap:0.4rem; font-size:0.88rem;">
                <div style="color:#52d4e0;">🎓 <strong>Capacitação:</strong> Prepara 2 funcionários por semana (1 livre e 1 trabalha na escola).</div>
                <div style="color:#8bc34a; font-weight:bold;">💰 <strong>Rendimento:</strong> Rende 500 moedas por semana.</div>
                <div style="color:var(--ink-light);">👥 <strong>Equipe:</strong> Mínimo de 3 funcionários • Máximo de 5 funcionários.</div>
                <div style="color:var(--gold); font-style:italic; margin-top:0.2rem;">⭐ <em>Pode evoluir!</em></div>
              </div>
            </div>

            <!-- Hospital -->
            <div style="background:rgba(0,0,0,0.5); border:1px solid var(--wood-plank); border-left:4px solid #e05252; border-radius:8px; padding:1.3rem; box-shadow:0 4px 14px rgba(0,0,0,0.45); display:flex; flex-direction:column; gap:0.8rem;">
              <div style="display:flex; justify-content:space-between; align-items:center;">
                <span style="font-family:'Cinzel',serif; font-weight:bold; font-size:1.2rem; color:#e05252;">🏥 Hospital</span>
                <span style="background:rgba(224,82,82,0.2); border:1px solid #e05252; color:var(--gold-bright); padding:3px 10px; border-radius:4px; font-weight:bold; font-size:0.9rem;">15.000 moedas</span>
              </div>
              <p style="font-size:0.92rem; color:var(--ink); line-height:1.5;">
                É necessário um hospital para todo o povo receber apoio! Só clínicas não bastam!
              </p>
              <div style="background:rgba(0,0,0,0.35); border-radius:6px; padding:0.8rem; border:1px solid rgba(255,255,255,0.06); display:flex; flex-direction:column; gap:0.4rem; font-size:0.88rem;">
                <div style="color:#8bc34a; font-weight:bold;">💰 <strong>Verba:</strong> Recebe 50 moedas por funcionário por semana.</div>
                <div style="color:var(--ink-light);">👥 <strong>Equipe Mínima:</strong> 5 funcionários e 5 médicos.</div>
                <div style="color:var(--ink-light);">👥 <strong>Equipe Máxima:</strong> 20 funcionários e 20 médicos.</div>
              </div>
            </div>

          </div>
        </div>

        <div style="text-align:center; padding:1.5rem; font-style:italic; color:var(--ink-light); font-size:0.9rem; border-top:1px dashed rgba(212,167,84,0.2);">
          ✨ Continua em breve... Novas regiões e propriedades serão adicionadas!
        </div>

      </div>

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

  <!-- ======================== ABA PERÍCIAS ======================== -->
  <section id="tab-content-pericias" class="tab-content">
    <div class="parchment-panel">
      <h2 class="section-title">🎓 Perícias & Especializações</h2>
      <div class="ornament-divider"><span>⚔️</span></div>
      
      <!-- Regra Geral & Exemplos -->
      <div style="background:rgba(212,175,55,0.08); border-left:4px solid var(--gold); border-radius:8px; padding:1.2rem 1.5rem; margin-bottom:2.5rem; max-width:980px; margin-left:auto; margin-right:auto;">
        <h3 style="font-family:'Cinzel',serif; color:var(--gold); font-size:1.15rem; margin-bottom:0.5rem; display:flex; align-items:center; gap:0.5rem;">
          <span>⚠️</span> Requisito de Habilitação
        </h3>
        <p style="font-size:0.95rem; color:var(--ink); line-height:1.6; margin-bottom:0.8rem;">
          É <strong>obrigatório possuir a perícia correspondente</strong> para conseguir fazer uso da área ou empunhar armas eficientemente. Sem a perícia, o personagem é considerado <strong>Totalmente Inexperiente</strong>, sofrendo penalidades graves ou incapacidade de ação.
        </p>
        <div style="background:rgba(0,0,0,0.25); border-radius:6px; padding:0.8rem 1rem; border:1px solid rgba(255,255,255,0.05); font-size:0.9rem; color:var(--ink-light); line-height:1.6;">
          <strong style="color:var(--gold-bright);">💡 Exemplos Práticos:</strong><br>
          <span style="color:#8bc34a;">▸</span> <strong>Perícia em Espada:</strong> Aprende a usar espada com precisão.<br>
          <span style="color:#52d4e0;">▸</span> <strong>Melhoria na Perícia em Espada:</strong> Melhora o uso em combate, tornando-se mais ágil, eficiente e letal.
        </div>
      </div>

      <!-- Duas Colunas: Progressão de Níveis + Sugestões de Efeitos -->
      <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(320px, 1fr)); gap:2rem; max-width:1050px; margin:0 auto 3rem;">
        
        <!-- Coluna Esquerda: Requisitos de Progressão -->
        <div style="border:1px solid var(--wood-plank); border-radius:10px; padding:1.5rem; background:rgba(0,0,0,0.25); box-shadow:0 4px 12px rgba(0,0,0,0.3);">
          <h3 style="font-family:'Cinzel',serif; color:var(--gold); font-size:1.2rem; margin-bottom:0.8rem; display:flex; align-items:center; gap:0.5rem;">
            <span>📊</span> Níveis de Proficiência (1 a 10)
          </h3>
          <p style="font-size:0.85rem; color:var(--ink-light); margin-bottom:1.2rem;">
            A proficiência evolui através de treinos e missões até o nível máximo.
          </p>

          <div style="display:flex; flex-direction:column; gap:0.45rem;">
            <div style="display:flex; justify-content:space-between; align-items:center; padding:0.5rem 0.8rem; border-radius:6px; background:rgba(224,82,82,0.1); border:1px solid rgba(224,82,82,0.25);">
              <span style="font-weight:bold; color:#e05252; font-size:0.9rem;">Sem Perícia</span>
              <span style="font-size:0.82rem; color:var(--ink-light);">Totalmente Inexperiente (Penalidades)</span>
            </div>
            <div style="display:flex; justify-content:space-between; align-items:center; padding:0.45rem 0.8rem; border-radius:6px; background:rgba(255,255,255,0.02);">
              <span style="font-weight:bold; color:var(--gold-bright); font-size:0.9rem;">Lvl 1</span>
              <span style="font-size:0.85rem; color:var(--ink);">Aprendiz / Iniciante</span>
            </div>
            <div style="display:flex; justify-content:space-between; align-items:center; padding:0.45rem 0.8rem; border-radius:6px; background:rgba(255,255,255,0.04);">
              <span style="font-weight:bold; color:var(--gold-bright); font-size:0.9rem;">Lvl 2</span>
              <span style="font-size:0.85rem; color:var(--ink);">Praticante</span>
            </div>
            <div style="display:flex; justify-content:space-between; align-items:center; padding:0.45rem 0.8rem; border-radius:6px; background:rgba(82,212,224,0.08); border-left:3px solid #52d4e0;">
              <div>
                <span style="font-weight:bold; color:#52d4e0; font-size:0.9rem;">Lvl 3</span>
                <span style="font-size:0.75rem; color:#52d4e0; margin-left:6px; background:rgba(82,212,224,0.15); padding:1px 5px; border-radius:3px;">Desbloqueio</span>
              </div>
              <span style="font-size:0.85rem; color:var(--ink);">Habilitado (Hab. Derivadas Comuns)</span>
            </div>
            <div style="display:flex; justify-content:space-between; align-items:center; padding:0.45rem 0.8rem; border-radius:6px; background:rgba(255,255,255,0.02);">
              <span style="font-weight:bold; color:var(--gold-bright); font-size:0.9rem;">Lvl 4</span>
              <span style="font-size:0.85rem; color:var(--ink);">Proficiente</span>
            </div>
            <div style="display:flex; justify-content:space-between; align-items:center; padding:0.45rem 0.8rem; border-radius:6px; background:rgba(160,94,224,0.08); border-left:3px solid #a05ee0;">
              <div>
                <span style="font-weight:bold; color:#a05ee0; font-size:0.9rem;">Lvl 5</span>
                <span style="font-size:0.75rem; color:#a05ee0; margin-left:6px; background:rgba(160,94,224,0.15); padding:1px 5px; border-radius:3px;">Desbloqueio</span>
              </div>
              <span style="font-size:0.85rem; color:var(--ink);">Veterano (Hab. Intermediárias)</span>
            </div>
            <div style="display:flex; justify-content:space-between; align-items:center; padding:0.45rem 0.8rem; border-radius:6px; background:rgba(255,255,255,0.02);">
              <span style="font-weight:bold; color:var(--gold-bright); font-size:0.9rem;">Lvl 6</span>
              <span style="font-size:0.85rem; color:var(--ink);">Elite</span>
            </div>
            <div style="display:flex; justify-content:space-between; align-items:center; padding:0.45rem 0.8rem; border-radius:6px; background:rgba(255,255,255,0.04);">
              <span style="font-weight:bold; color:var(--gold-bright); font-size:0.9rem;">Lvl 7</span>
              <span style="font-size:0.85rem; color:var(--ink);">Mestre de Campo</span>
            </div>
            <div style="display:flex; justify-content:space-between; align-items:center; padding:0.45rem 0.8rem; border-radius:6px; background:rgba(240,160,80,0.08); border-left:3px solid #f0a050;">
              <span style="font-weight:bold; color:#f0a050; font-size:0.9rem;">Lvl 8</span>
              <span style="font-size:0.85rem; color:var(--ink);">Grão-Mestre (Pode treinar outros em dupla)</span>
            </div>
            <div style="display:flex; justify-content:space-between; align-items:center; padding:0.45rem 0.8rem; border-radius:6px; background:rgba(255,255,255,0.02);">
              <span style="font-weight:bold; color:var(--gold-bright); font-size:0.9rem;">Lvl 9</span>
              <span style="font-size:0.85rem; color:var(--ink);">Lenda Viva</span>
            </div>
            <div style="display:flex; justify-content:space-between; align-items:center; padding:0.5rem 0.8rem; border-radius:6px; background:rgba(212,175,55,0.18); border:1px solid rgba(212,175,55,0.4);">
              <div>
                <span style="font-weight:bold; color:var(--gold-bright); font-size:0.95rem;">Lvl 10</span>
                <span style="font-size:0.75rem; color:var(--gold); margin-left:6px; background:rgba(212,175,55,0.25); padding:1px 6px; border-radius:3px;">MÁXIMO</span>
              </div>
              <span style="font-size:0.85rem; font-weight:bold; color:var(--gold-bright);">Expert (Eficiência Máxima / Sem Limitações)</span>
            </div>
          </div>
        </div>

        <!-- Coluna Direita: Efeitos e Benefícios -->
        <div style="border:1px solid var(--wood-plank); border-radius:10px; padding:1.5rem; background:rgba(0,0,0,0.25); box-shadow:0 4px 12px rgba(0,0,0,0.3); display:flex; flex-direction:column; gap:1.1rem;">
          <h3 style="font-family:'Cinzel',serif; color:var(--gold); font-size:1.2rem; display:flex; align-items:center; gap:0.5rem;">
            <span>💡</span> Bônus por Nível Investido
          </h3>
          <p style="font-size:0.85rem; color:var(--ink-light); line-height:1.5;">
            Investir em perícias concede bônus passivos escalonados de acordo com a área de aplicação:
          </p>

          <!-- Card Bônus Combate -->
          <div style="border-left:3px solid #e05252; background:rgba(224,82,82,0.06); padding:0.9rem 1.1rem; border-radius:0 8px 8px 0;">
            <div style="font-weight:bold; color:#e05252; font-size:0.95rem; margin-bottom:0.25rem;">⚔️ Combate & Armas</div>
            <div style="font-size:0.88rem; color:var(--ink); line-height:1.5;">
              <strong>+2% de Dano Físico e Acerto</strong> por nível empunhando a arma da perícia (máx. <strong>+20%</strong> no Lvl 10).
            </div>
          </div>

          <!-- Card Bônus Magia -->
          <div style="border-left:3px solid #a05ee0; background:rgba(160,94,224,0.06); padding:0.9rem 1.1rem; border-radius:0 8px 8px 0;">
            <div style="font-weight:bold; color:#a05ee0; font-size:0.95rem; margin-bottom:0.25rem;">✨ Magia & Apoio</div>
            <div style="font-size:0.88rem; color:var(--ink); line-height:1.5;">
              <strong>+2% de Eficiência Mágica, Cura ou Velocidade de Conjuração</strong> por nível naquela escola (máx. <strong>+20%</strong> no Lvl 10).
            </div>
          </div>

          <!-- Card Bônus Defesa -->
          <div style="border-left:3px solid #52d4e0; background:rgba(82,212,224,0.06); padding:0.9rem 1.1rem; border-radius:0 8px 8px 0;">
            <div style="font-weight:bold; color:#52d4e0; font-size:0.95rem; margin-bottom:0.25rem;">🛡️ Sobrevivência & Defesa</div>
            <div style="font-size:0.88rem; color:var(--ink); line-height:1.5;">
              <strong>+2% de chance de ativação ou redução de dano</strong> por nível (Esquiva, Bloqueio, Resiliência — máx. <strong>+20%</strong>).
            </div>
          </div>

          <!-- Card Bônus Ofícios -->
          <div style="border-left:3px solid #f0a050; background:rgba(240,160,80,0.06); padding:0.9rem 1.1rem; border-radius:0 8px 8px 0;">
            <div style="font-weight:bold; color:#f0a050; font-size:0.95rem; margin-bottom:0.25rem;">🔨 Ofícios & Criação</div>
            <div style="font-size:0.88rem; color:var(--ink); line-height:1.5;">
              <strong>+3% de chance de fabricação</strong> ou <strong>+2% de atributos adicionais</strong> em itens criados por nível.
            </div>
          </div>
        </div>

      </div>

      <!-- ======================== COMPÊNDIO DE PERÍCIAS ======================== -->
      <div class="ornament-divider" style="margin: 3.5rem 0 2rem;"><span>✦ 🗂️ ✦</span></div>

      <h3 class="section-title" style="font-size:1.6rem; margin-bottom:0.6rem;">🗂️ Compêndio de Perícias Oficiais</h3>
      <p style="text-align:center; font-style:italic; color:var(--ink-light); margin-bottom:2.5rem; font-size:0.95rem;">
        Todas as perícias disponíveis agrupadas por categoria temática.
      </p>

      <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(300px, 1fr)); gap:1.6rem; max-width:1100px; margin:0 auto;">

        <!-- 1. Combate & Aptidões Físicas -->
        <div style="border:1px solid var(--wood-plank); border-top:3px solid #e05252; border-radius:10px; padding:1.4rem; background:rgba(0,0,0,0.25); box-shadow:0 4px 12px rgba(0,0,0,0.25);">
          <div style="font-family:'Cinzel',serif; font-size:1.15rem; color:#e05252; font-weight:bold; margin-bottom:1rem; display:flex; align-items:center; gap:0.5rem;">
            <span>🥊</span> Combate & Físicas
          </div>
          <div style="display:flex; flex-direction:column; gap:0.55rem;">
            <div style="font-size:0.88rem; color:var(--ink); line-height:1.4;"><strong style="color:var(--gold-bright);">Combate:</strong> Habilidade de luta geral armada ou tática.</div>
            <div style="font-size:0.88rem; color:var(--ink); line-height:1.4;"><strong style="color:var(--gold-bright);">Arte Marcial:</strong> Combate corpo a corpo desarmado.</div>
            <div style="font-size:0.88rem; color:var(--ink); line-height:1.4;"><strong style="color:var(--gold-bright);">Vitalidade:</strong> Expansão do vigor físico geral e fôlego.</div>
            <div style="font-size:0.88rem; color:var(--ink); line-height:1.4;"><strong style="color:var(--gold-bright);">Resistência:</strong> Suporte a impactos e traumas físicos.</div>
            <div style="font-size:0.88rem; color:var(--ink); line-height:1.4;"><strong style="color:var(--gold-bright);">Resiliência:</strong> Tolerância a dores, venenos e efeitos adversos.</div>
            <div style="font-size:0.88rem; color:var(--ink); line-height:1.4;"><strong style="color:var(--gold-bright);">Bloqueio:</strong> Absorção de impacto com escudos ou antebraço.</div>
            <div style="font-size:0.88rem; color:var(--ink); line-height:1.4;"><strong style="color:var(--gold-bright);">Esquiva:</strong> Reflexos rápidos para esquivar e evasão.</div>
            <div style="font-size:0.88rem; color:var(--ink); line-height:1.4;"><strong style="color:var(--gold-bright);">Agilidade:</strong> Flexibilidade, saltos e mobilidade no combate.</div>
          </div>
        </div>

        <!-- 2. Armas & Equipamentos -->
        <div style="border:1px solid var(--wood-plank); border-top:3px solid #f0a050; border-radius:10px; padding:1.4rem; background:rgba(0,0,0,0.25); box-shadow:0 4px 12px rgba(0,0,0,0.25);">
          <div style="font-family:'Cinzel',serif; font-size:1.15rem; color:#f0a050; font-weight:bold; margin-bottom:0.8rem; display:flex; align-items:center; gap:0.5rem;">
            <span>⚔️</span> Armas & Equipamentos
          </div>
          <p style="font-size:0.82rem; color:var(--ink-light); margin-bottom:0.9rem; font-style:italic;">
            Cada arma exige sua própria perícia. A velocidade de ataque depende da arma empunhada.
          </p>
          <div style="display:flex; flex-wrap:wrap; gap:0.45rem; margin-bottom:1rem;">
            <span style="background:rgba(0,0,0,0.45); border:1px solid rgba(240,160,80,0.5); color:#ffb770; padding:0.35rem 0.75rem; border-radius:6px; font-size:0.85rem; font-weight:bold; letter-spacing:0.02em;">Adaga</span>
            <span style="background:rgba(0,0,0,0.45); border:1px solid rgba(240,160,80,0.5); color:#ffb770; padding:0.35rem 0.75rem; border-radius:6px; font-size:0.85rem; font-weight:bold; letter-spacing:0.02em;">Espada</span>
            <span style="background:rgba(0,0,0,0.45); border:1px solid rgba(240,160,80,0.5); color:#ffb770; padding:0.35rem 0.75rem; border-radius:6px; font-size:0.85rem; font-weight:bold; letter-spacing:0.02em;">Katana</span>
            <span style="background:rgba(0,0,0,0.45); border:1px solid rgba(240,160,80,0.5); color:#ffb770; padding:0.35rem 0.75rem; border-radius:6px; font-size:0.85rem; font-weight:bold; letter-spacing:0.02em;">Lança</span>
            <span style="background:rgba(0,0,0,0.45); border:1px solid rgba(240,160,80,0.5); color:#ffb770; padding:0.35rem 0.75rem; border-radius:6px; font-size:0.85rem; font-weight:bold; letter-spacing:0.02em;">Alabarda</span>
            <span style="background:rgba(0,0,0,0.45); border:1px solid rgba(240,160,80,0.5); color:#ffb770; padding:0.35rem 0.75rem; border-radius:6px; font-size:0.85rem; font-weight:bold; letter-spacing:0.02em;">Espadão</span>
            <span style="background:rgba(0,0,0,0.45); border:1px solid rgba(240,160,80,0.5); color:#ffb770; padding:0.35rem 0.75rem; border-radius:6px; font-size:0.85rem; font-weight:bold; letter-spacing:0.02em;">Machado</span>
            <span style="background:rgba(0,0,0,0.45); border:1px solid rgba(240,160,80,0.5); color:#ffb770; padding:0.35rem 0.75rem; border-radius:6px; font-size:0.85rem; font-weight:bold; letter-spacing:0.02em;">Foice</span>
            <span style="background:rgba(0,0,0,0.45); border:1px solid rgba(240,160,80,0.5); color:#ffb770; padding:0.35rem 0.75rem; border-radius:6px; font-size:0.85rem; font-weight:bold; letter-spacing:0.02em;">Martelo</span>
            <span style="background:rgba(0,0,0,0.45); border:1px solid rgba(240,160,80,0.5); color:#ffb770; padding:0.35rem 0.75rem; border-radius:6px; font-size:0.85rem; font-weight:bold; letter-spacing:0.02em;">Maça</span>
            <span style="background:rgba(0,0,0,0.45); border:1px solid rgba(240,160,80,0.5); color:#ffb770; padding:0.35rem 0.75rem; border-radius:6px; font-size:0.85rem; font-weight:bold; letter-spacing:0.02em;">Escudo</span>
            <span style="background:rgba(0,0,0,0.45); border:1px solid rgba(240,160,80,0.5); color:#ffb770; padding:0.35rem 0.75rem; border-radius:6px; font-size:0.85rem; font-weight:bold; letter-spacing:0.02em;">Ioiô</span>
            <span style="background:rgba(0,0,0,0.45); border:1px solid rgba(240,160,80,0.5); color:#ffb770; padding:0.35rem 0.75rem; border-radius:6px; font-size:0.85rem; font-weight:bold; letter-spacing:0.02em;">Cajado</span>
            <span style="background:rgba(0,0,0,0.45); border:1px solid rgba(240,160,80,0.5); color:#ffb770; padding:0.35rem 0.75rem; border-radius:6px; font-size:0.85rem; font-weight:bold; letter-spacing:0.02em;">Grimório</span>
          </div>
          <div style="background:rgba(0,0,0,0.4); border-radius:6px; padding:0.7rem 0.9rem; border:1px solid rgba(255,255,255,0.08); font-size:0.88rem; color:var(--ink);">
            🏹 <strong>Arco e flecha:</strong> Velocidade de ataque e recuo dependem do tipo de arco e da tensão utilizada.
          </div>
        </div>

        <!-- 3. Arcanismo & Mente -->
        <div style="border:1px solid var(--wood-plank); border-top:3px solid #a05ee0; border-radius:10px; padding:1.4rem; background:rgba(0,0,0,0.25); box-shadow:0 4px 12px rgba(0,0,0,0.25);">
          <div style="font-family:'Cinzel',serif; font-size:1.15rem; color:#a05ee0; font-weight:bold; margin-bottom:1rem; display:flex; align-items:center; gap:0.5rem;">
            <span>🔮</span> Arcano & Mente
          </div>
          <div style="display:flex; flex-direction:column; gap:0.55rem;">
            <div style="font-size:0.88rem; color:var(--ink); line-height:1.4;"><strong style="color:var(--gold-bright);">Magia:</strong> Manipulação de fluxos de mana e magias ativas.</div>
            <div style="font-size:0.88rem; color:var(--ink); line-height:1.4;"><strong style="color:var(--gold-bright);">Inteligência:</strong> Raciocínio tático, decifração e estratégias.</div>
            <div style="font-size:0.88rem; color:var(--ink); line-height:1.4;"><strong style="color:var(--gold-bright);">Magia de Apoio:</strong> Conjuração de curas, buffs, barreiras e purificação.</div>
            <div style="font-size:0.88rem; color:var(--ink); line-height:1.4;"><strong style="color:var(--gold-bright);">Concentração:</strong> Foco absoluto e proteção contra interrupções.</div>
            <div style="font-size:0.88rem; color:var(--ink); line-height:1.4;"><strong style="color:var(--gold-bright);">Percepção:</strong> Visão em combate, identificação de armadilhas e pontos fracos.</div>
            <div style="font-size:0.88rem; color:var(--ink); line-height:1.4;"><strong style="color:var(--gold-bright);">Furtividade:</strong> Movimentação silenciosa e ocultação nas sombras.</div>
            <div style="font-size:0.88rem; color:var(--ink); line-height:1.4;"><strong style="color:var(--gold-bright);">Manuseio:</strong> Destreza manual, arrombamento e gatilhos rápidos.</div>
            <div style="font-size:0.88rem; color:var(--ink); line-height:1.4;"><strong style="color:var(--gold-bright);">Precaução:</strong> Sentido de alerta prévio contra emboscadas.</div>
            <div style="font-size:0.88rem; color:var(--ink); line-height:1.4;"><strong style="color:var(--gold-bright);">Encantar:</strong> Aplicação de infusões mágicas em armas e itens.</div>
          </div>
        </div>

        <!-- 4. Ofícios, Trabalho & Exploração -->
        <div style="border:1px solid var(--wood-plank); border-top:3px solid #8bc34a; border-radius:10px; padding:1.4rem; background:rgba(0,0,0,0.25); box-shadow:0 4px 12px rgba(0,0,0,0.25);">
          <div style="font-family:'Cinzel',serif; font-size:1.15rem; color:#8bc34a; font-weight:bold; margin-bottom:1rem; display:flex; align-items:center; gap:0.5rem;">
            <span>🌿</span> Ofícios, Trabalho & Exploração
          </div>
          <div style="display:flex; flex-wrap:wrap; gap:0.45rem; margin-bottom:1rem;">
            <span style="background:rgba(0,0,0,0.45); border:1px solid rgba(139,195,74,0.5); color:#a6e258; padding:0.35rem 0.65rem; border-radius:6px; font-size:0.85rem; font-weight:bold;">Agricultura</span>
            <span style="background:rgba(0,0,0,0.45); border:1px solid rgba(139,195,74,0.5); color:#a6e258; padding:0.35rem 0.65rem; border-radius:6px; font-size:0.85rem; font-weight:bold;">Pecuária</span>
            <span style="background:rgba(0,0,0,0.45); border:1px solid rgba(139,195,74,0.5); color:#a6e258; padding:0.35rem 0.65rem; border-radius:6px; font-size:0.85rem; font-weight:bold;">Culinária</span>
            <span style="background:rgba(0,0,0,0.45); border:1px solid rgba(139,195,74,0.5); color:#a6e258; padding:0.35rem 0.65rem; border-radius:6px; font-size:0.85rem; font-weight:bold;">Mineração</span>
            <span style="background:rgba(0,0,0,0.45); border:1px solid rgba(139,195,74,0.5); color:#a6e258; padding:0.35rem 0.65rem; border-radius:6px; font-size:0.85rem; font-weight:bold;">Artesanato</span>
            <span style="background:rgba(0,0,0,0.45); border:1px solid rgba(139,195,74,0.5); color:#a6e258; padding:0.35rem 0.65rem; border-radius:6px; font-size:0.85rem; font-weight:bold;">Metalurgia</span>
            <span style="background:rgba(0,0,0,0.45); border:1px solid rgba(139,195,74,0.5); color:#a6e258; padding:0.35rem 0.65rem; border-radius:6px; font-size:0.85rem; font-weight:bold;">Síntese</span>
            <span style="background:rgba(0,0,0,0.45); border:1px solid rgba(139,195,74,0.5); color:#a6e258; padding:0.35rem 0.65rem; border-radius:6px; font-size:0.85rem; font-weight:bold;">Estilismo</span>
            <span style="background:rgba(0,0,0,0.45); border:1px solid rgba(139,195,74,0.5); color:#a6e258; padding:0.35rem 0.65rem; border-radius:6px; font-size:0.85rem; font-weight:bold;">Caça</span>
            <span style="background:rgba(0,0,0,0.45); border:1px solid rgba(139,195,74,0.5); color:#a6e258; padding:0.35rem 0.65rem; border-radius:6px; font-size:0.85rem; font-weight:bold;">Monstros</span>
            <span style="background:rgba(0,0,0,0.45); border:1px solid rgba(139,195,74,0.5); color:#a6e258; padding:0.35rem 0.65rem; border-radius:6px; font-size:0.85rem; font-weight:bold;">Ciência</span>
            <span style="background:rgba(0,0,0,0.45); border:1px solid rgba(139,195,74,0.5); color:#a6e258; padding:0.35rem 0.65rem; border-radius:6px; font-size:0.85rem; font-weight:bold;">Alquimia</span>
            <span style="background:rgba(0,0,0,0.45); border:1px solid rgba(139,195,74,0.5); color:#a6e258; padding:0.35rem 0.65rem; border-radius:6px; font-size:0.85rem; font-weight:bold;">Masmorra</span>
          </div>
          <div style="display:flex; flex-direction:column; gap:0.35rem; font-size:0.85rem; color:var(--ink-light); border-top:1px solid rgba(255,255,255,0.06); padding-top:0.6rem;">
            <div>🌱 <strong>Conhecimento da Flora:</strong> Identificação e colheita de ervas e plantas místicas.</div>
            <div>🐾 <strong>Conhecimento da Fauna:</strong> Comportamento, rastreamento e anatomia de animais.</div>
          </div>
        </div>

        <!-- 5. Social & Intriga -->
        <div style="border:1px solid var(--wood-plank); border-top:3px solid #e052a5; border-radius:10px; padding:1.4rem; background:rgba(0,0,0,0.25); box-shadow:0 4px 12px rgba(0,0,0,0.25);">
          <div style="font-family:'Cinzel',serif; font-size:1.15rem; color:#e052a5; font-weight:bold; margin-bottom:1rem; display:flex; align-items:center; gap:0.5rem;">
            <span>🎭</span> Social & Intriga
          </div>
          <div style="display:flex; flex-direction:column; gap:0.55rem;">
            <div style="font-size:0.88rem; color:var(--ink); line-height:1.4;"><strong style="color:var(--gold-bright);">Comunicação:</strong> Eloquência, oratória e influência interpessoal.</div>
            <div style="font-size:0.88rem; color:var(--ink); line-height:1.4;"><strong style="color:var(--gold-bright);">Negociação:</strong> Obtenção de melhores preços em comércio e acordos.</div>
            <div style="font-size:0.88rem; color:var(--ink); line-height:1.4;"><strong style="color:var(--gold-bright);">Sedução:</strong> Charme, atração e persuasão de indivíduos.</div>
            <div style="font-size:0.88rem; color:var(--ink); line-height:1.4;"><strong style="color:var(--gold-bright);">Drenagem Vital:</strong> Manipulação de essência de terceiros em contato íntimo ou social.</div>
            <div style="font-size:0.88rem; color:var(--ink); line-height:1.4;"><strong style="color:var(--gold-bright);">Manipulação:</strong> Enganação, leitura de intenções e controle de percepção alheia.</div>
          </div>
        </div>

      </div>

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
      <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:1rem; margin-bottom:0.5rem;">
        <h2 class="section-title" style="margin:0;">🎭 NPCs</h2>
        <div id="npcs-admin-actions"></div>
      </div>
      <div class="ornament-divider"><span>⚔️</span></div>
      <p style="text-align:center; font-style:italic; color:var(--ink-light); margin-bottom:1.5rem;">
        Personagens notáveis, mentores, comerciantes e figuras influentes do Continente de Kensword.
      </p>
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
      <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:1rem; margin-bottom:0.5rem;">
        <h2 class="section-title" style="margin:0;">🏰 Organizações &amp; Facções</h2>
        <div id="orgs-admin-actions"></div>
      </div>
      <div class="ornament-divider"><span>✦</span></div>
      <p style="text-align:center; font-style:italic; color:var(--ink-light); margin-bottom:1.5rem;">
        Grandes guildas, ordens religiosas e sindicatos que moldam o poder no Continente de Kensword.
      </p>
      <div id="orgs-grid" class="characters-grid"></div>
    </div>
  </section>

  <section id="tab-content-monsters" class="tab-content">
    <div class="parchment-panel">
      <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:1rem; margin-bottom:0.5rem;">
        <h2 class="section-title" style="margin:0;">👾 Bestiário de Kensword</h2>
        <div id="monsters-admin-actions"></div>
      </div>
      <div class="ornament-divider"><span>✦</span></div>
      <p style="text-align:center; font-style:italic; color:var(--ink-light); margin-bottom:1.5rem;">
        Catálogo de criaturas, bestas mágicas e chefes de andar que habitam o continente.
      </p>
      <div id="monsters-grid" class="characters-grid"></div>
    </div>
  </section>
`;
