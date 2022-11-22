using Benner.Tecnologia.Common.Scripting.UserInterface;
using System;

namespace Benner.Reservas.Entidades
{
    
 
    [ScriptUI()]
    public partial class Reservas
    {
        [ViewLoaded]
        public void ViewLoaded()
        {
            MostrarQuilometragem();
        }

        //public void VerificaDataSolicitacao()
        //{
        //    var dataSol =this.DataSolicitacao;
        //    var dataMin = dataSol.Value.AddDays(7);
        //    if (dataMin < DateTime.Now)
        //    {
        //        this[FieldNames.DataSolicitacao].Label = "Data de solicitação (mais 7 dias)";
        //    }
        //}

        [FieldChanged(FieldNames.Plano)]
        public void PlanoChange()
        {
            MostrarQuilometragem();
        }

        private void MostrarQuilometragem()
        {
            this[FieldNames.Quilometragem].Visible = (this[FieldNames.Plano].GetInt32() == PlanosTipoListaItens.ItemKilometragem);
        }
    }
}
