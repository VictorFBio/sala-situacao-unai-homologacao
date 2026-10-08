# Homologação da Sala de Situação de Unaí

Ambiente público separado para testar o portal modular. Sem domínio personalizado, serviços pagos ou token entre repositórios. O domínio em produção não é alterado por estes workflows.

**Publicar:** executar Actions → Homologar ecossistema → pacote `integrado`, informando o commit completo do publicador `VictorFBio/sala-situacao-unai-v2`. O manifesto daquele commit fixa os demais módulos. O workflow verifica o backup, instala dependências, executa testes, audit e compilação e publica somente o pacote estático.

**Ensaiar recuperação:** executar o mesmo workflow com pacote `referencia`, sem commit. Publica o ZIP preservado de 109d7d5 após conferir SHA-256. Depois reexecutar com `integrado` e o commit escolhido. A referência reproduz a apresentação anterior no endereço de testes; não implica regressão no domínio principal.

O release `base-109d7d5` contém apenas arquivos já públicos da publicação de referência. O backup completo do Git fica local, fora deste repositório.

Consulta diária de disponibilidade via Actions. Acompanhe notificações de falha na conta GitHub. Schedules de repositórios públicos podem ser suspensos após inatividade; revisar periodicamente. São consultas simples, sem garantia de monitoramento contínuo.

Ativação em produção depende da avaliação de 15/10/2026 e aprovação específica da versão, conforme o guia `docs/expansao/OPERACAO.md` do publicador.
