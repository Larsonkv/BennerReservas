using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Benner.Reservas.Comum
{
   /// <summary>
   /// Leva os parametros para consulta do serviço
   /// </summary>
    public class ReservaPorStatusRequest
    {
        /// <summary>
        /// Informa o status desejado 1- Aguardando, 2 - Aprovado
        /// </summary>
        public int Status { get; set; }
        /// <summary>
        /// Data inicio das reservas
        /// </summary>
        public DateTime DataInicio { get; set; }
        /// <summary>
        /// Data de fim das reservas
        /// </summary>
        public DateTime DataFim { get; set; }
    }
}
