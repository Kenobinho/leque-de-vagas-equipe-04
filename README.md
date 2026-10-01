Um componente é uma partícula de código que é integrada ao sistema, de acordo com sua função original, trazendo praticidade e fluidez ao código, além de facilitar o trabalho de refatoração do código, visto que um único componente pode ser usado inúmeras vezes no nosso código sem que precisemos repeti-lo uma única vez. Assim, não precisamos dar 'CTRL + F' para procurar código quebrado que precisa ser corrigido.

## 🗺️ Rotas da Aplicação

| Rota | Tipo | Arquivo de Origem | Descrição |
| :--- | :--- | :--- | :--- |
| `/` | Estática | `app/page.tsx` | Página inicial da plataforma (Home). |
| `/vagas` | Estática | `app/vagas/page.tsx` | Listagem geral com todas as vagas disponíveis. |
| `/vagas/[id]` | Dinâmica | `app/vagas/[id]/page.tsx` | Detalhes de uma vaga específica (ex: `/vagas/1`). |
| `/busca` | Interativa | `app/busca/page.tsx` | Busca avançada com filtros por área, salário, regime, modalidade e benefícios. |
| `/empresas/[slug]` | Dinâmica | `app/empresas/[slug]/page.tsx` | Perfil corporativo da empresa (ex: `/empresas/tech-solutions`). |
| `/termos` | Estática | `app/(institucional)/termos/page.tsx` | Termos e condições de uso da plataforma. |
| `/privacidade` | Estática | `app/(institucional)/privacidade/page.tsx` | Política de privacidade e conformidade com a LGPD. |

### ⚙️ Rotas Especiais do Sistema (Next.js)

* **Página 404 (`app/not-found.tsx`):** Exibida automaticamente quando o usuário tenta acessar uma rota ou vaga inexistente.
* **Carregamento (`app/loading.tsx`):** Estado visual de espera (*loading*) enquanto as páginas são renderizadas.
* **Tratamento de Erros (`app/error.tsx`):** *Error Boundary* cliente para capturar falhas inesperadas e permitir tentar novamente via botão.