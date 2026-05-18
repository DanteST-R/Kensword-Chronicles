---
trigger: always_on
---

Regra de Negócio: Fluxo de Criação e Aprovação de Fichas (Firestore)
Sempre que um jogador (user_role: "player") criar ou enviar uma nova ficha de personagem para o portal Kensword Chronicles, o sistema e o banco de dados devem seguir estritamente este fluxo de estados:

Envio (Status Inicial): A ficha recém-criada é salva na coleção characters do Firestore obrigatoriamente com o status de aprovação definido como "pending" (Aguardando Mestre).
Bloqueio de Uso: O jogador NÃO pode utilizar o personagem ativamente no site, rolar dados oficiais ou participar de eventos enquanto o documento do personagem no Firebase estiver com o status "pending". O acesso completo à ficha só é liberado após aprovação.
Aprovação (Mudança de Status): Apenas usuários autenticados com as permissões user_role: "admin" (DanteSTR) ou user_role: "sub-admin" (Mestre/Moderador) têm a autoridade de acessar o painel administrativo e alterar o status da ficha no Firestore de "pending" para "approved".
Erro Crítico a Evitar: Garanta que a rota ou a função que faz o push/salvamento do formulário inicial da ficha no Firebase NÃO insira o status "approved" de forma automática ou padrão. O sistema deve ignorar qualquer tentativa do cliente (frontend) de forçar o status para aprovado durante a criação; o valor de segurança no backend/banco deve ser sempre fixado em "pending".