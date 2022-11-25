using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Benner.Reservas.Comum
{
    public class NovaPessoaNovaReservaRequest
    {
        //Informaçoes passadas
        public string Nome { get; set; }
        public string Cpf { get; set; }
        public string Email { get; set; }
        public string TelefoneMovel { get; set; }
        public long HandleModeloCarro { get; set; }
        public long HandlePlano { get; set; }
        public DateTime DataInicio { get; set; }
        public DateTime DataFim { get; set; }
    }
}
