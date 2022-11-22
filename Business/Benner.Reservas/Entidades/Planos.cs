using Benner.Tecnologia.Business;
using Benner.Tecnologia.Business.Validation;
using Benner.Tecnologia.Common;
using Microsoft.Practices.EnterpriseLibrary.Validation;
using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.ComponentModel;
using System.Linq;
using System.Reflection;
using System.Runtime.Serialization;
using System.Text;


namespace Benner.Reservas.Entidades
{
    
    
    /// <summary>
    /// Nome da Tabela: PLANOS.
    /// Essa é uma classe parcial, os atributos, herança e propriedades estão definidos no arquivo Planos.properties.cs
    /// </summary>
    public partial class Planos
    {
        public override void Validate(ValidationResults validationResults)
        {

            if (this.DataInicio > this.DataFim)
            {
                validationResults.AddResult(new EntityValidationResult("A data final não pode ser menor que a data inicial!"));
            }
            base.Validate(validationResults);
        }
    }
}
