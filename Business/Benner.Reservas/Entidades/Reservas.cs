﻿using Benner.Tecnologia.Business;
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
    /// Nome da Tabela: RESERVAS.
    /// Essa é uma classe parcial, os atributos, herança e propriedades estão definidos no arquivo Reservas.properties.cs
    /// </summary>
    public partial class Reservas
    {
        private void AtribuiSomenteLeituraDataDeSolicitacao()
        {
            this.Visualization.Fields[FieldNames.DataSolicitacao].ReadOnly = true;
        }

        protected override void Created()
        {
            base.Created();
            AtribuiSomenteLeituraDataDeSolicitacao();
        }
        protected override void Edited()
        {
            if (this.DataSolicitacao == null)
            {
                this.DataSolicitacao = DateTime.Now;
            }
            base.Edited();
            AtribuiSomenteLeituraDataDeSolicitacao();
        }

        protected override void Saving()
        {
            if(this.DataFim > this.PlanoInstance.DataFim)
            {
                throw new BusinessException("O plano já estará vencido na data de devolução!");
            }


            if(this.State == EntityState.Initialized)
            {
                this.DataSolicitacao = DateTime.Now;
            }

            string mensagem = "Esta reserva custará R$ ";
            if(this.PlanoInstance.Tipo == PlanosTipoListaItens.ItemKilometragem)
            {
                if(this.Quilometragem != null && this.Quilometragem.Value > 0m)
                {
                    mensagem += this.PlanoInstance.ValorReferencia.Value * this.Quilometragem;
                }
            }
            else if(this.PlanoInstance.Tipo == PlanosTipoListaItens.ItemDiaria)
            {
                int numeroDias = (this.DataFim - this.DataInicio).Value.Days;
                mensagem += this.PlanoInstance.ValorReferencia * numeroDias;
            }
            else if (this.PlanoInstance.Tipo == PlanosTipoListaItens.ItemValorFechado)
            {
                mensagem += this.PlanoInstance.ValorReferencia;
            }
           
            this.Observacoes = mensagem;
            base.Saving();
        }

        public override void Validate(ValidationResults validationResults)
        {
   
            if (this.DataInicio > this.DataFim)
            {
                validationResults.AddResult(new EntityValidationResult("A data final não pode ser menor que a data inicial!"));
            }
            base.Validate(validationResults);
        }

        protected override void Saved()
        {
            DocumentosFinanceiros documentosFinanceiros = DocumentosFinanceiros.Create();
            documentosFinanceiros.Tipo = DocumentosFinanceirosTipoListaItens.ItemCredito;
            documentosFinanceiros.Valor = 0;
            documentosFinanceiros.Save();

            ReservaDocumentos reservaDocumentos = ReservaDocumentos.Create();
            reservaDocumentos.ReservaInstance = this;
            reservaDocumentos.DocumentoFinanceiro.Instance = documentosFinanceiros;
            reservaDocumentos.Save();
            base.Saved();
        }
    }
}
