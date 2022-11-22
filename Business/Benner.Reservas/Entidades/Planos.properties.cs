﻿//------------------------------------------------------------------------------
// <auto-generated>
//     O código foi gerado por uma ferramenta.
//     Versão de Tempo de Execução:4.0.30319.42000
//
//     As alterações ao arquivo poderão causar comportamento incorreto e serão perdidas se
//     o código for gerado novamente.
// </auto-generated>
//------------------------------------------------------------------------------

using Benner.Tecnologia.Business;
using Benner.Tecnologia.Common;
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
    /// Interface para a tabela PLANOS
    /// </summary>
    public partial interface IPlanos : IEntityBase
    {
        
        /// <summary>
        /// Ativo (ATIVO.)
        /// Opcional = S, Invisível = False, Default = True
        /// </summary>
        [System.CodeDom.Compiler.GeneratedCodeAttribute("BEF Code Generator", "22.0.36.3")]
        System.Nullable<bool> Ativo
        {
            get;
            set;
        }
        
        /// <summary>
        /// Data fim (DATAFIM.)
        /// Opcional = S, Invisível = False, Formato Data = Dia, Mês, Ano - Formato Hora = Sem hora
        /// </summary>
        [System.CodeDom.Compiler.GeneratedCodeAttribute("BEF Code Generator", "22.0.36.3")]
        System.Nullable<System.DateTime> DataFim
        {
            get;
            set;
        }
        
        /// <summary>
        /// Data início (DATAINICIO.)
        /// Opcional = N, Invisível = False, Formato Data = Dia, Mês, Ano - Formato Hora = Sem hora
        /// </summary>
        [System.CodeDom.Compiler.GeneratedCodeAttribute("BEF Code Generator", "22.0.36.3")]
        System.Nullable<System.DateTime> DataInicio
        {
            get;
            set;
        }
        
        /// <summary>
        /// Identificador (IDENTIFICADOR.)
        /// Opcional = N, Invisível = False, Tamanho = 10
        /// </summary>
        [System.CodeDom.Compiler.GeneratedCodeAttribute("BEF Code Generator", "22.0.36.3")]
        string Identificador
        {
            get;
            set;
        }
        
        /// <summary>
        /// Resultado financeiro (RESULTADOFINANCEIRO.)
        /// Opcional = S, Invisível = False, Valor Mínimo = , Valor Máximo = , Tipo do Builder = Valor
        /// </summary>
        [System.CodeDom.Compiler.GeneratedCodeAttribute("BEF Code Generator", "22.0.36.3")]
        System.Nullable<decimal> ResultadoFinanceiro
        {
            get;
            set;
        }
        
        /// <summary>
        /// Tipo (TIPO.)
        /// Opcional = N, Invisível = False
        /// </summary>
        [System.CodeDom.Compiler.GeneratedCodeAttribute("BEF Code Generator", "22.0.36.3")]
        PlanosTipoListaItens Tipo
        {
            get;
            set;
        }
        
        /// <summary>
        /// Valor referência (VALORREFERENCIA.)
        /// Opcional = N, Invisível = False, Valor Mínimo = , Valor Máximo = , Tipo do Builder = Valor
        /// </summary>
        [System.CodeDom.Compiler.GeneratedCodeAttribute("BEF Code Generator", "22.0.36.3")]
        System.Nullable<decimal> ValorReferencia
        {
            get;
            set;
        }
    }
    
    /// <summary>
    /// Interface para o DAO para a tabela PLANOS
    /// </summary>
    public partial interface IPlanosDao : IBusinessEntityDao<IPlanos>
    {
    }
    
    /// <summary>
    /// DAO para a tabela PLANOS
    /// </summary>
    public partial class PlanosDao : BusinessEntityDao<Planos, IPlanos>, IPlanosDao
    {
        
        public static PlanosDao CreateInstance()
        {
            return CreateInstance<PlanosDao>();
        }
    }
    
    /// <summary>
    /// Esta classe contém os itens do campo TIPO.
    /// </summary>
    [System.CodeDom.Compiler.GeneratedCodeAttribute("BEF Code Generator", "22.0.36.3")]
    public class PlanosTipoListaItens : ListItems<PlanosTipoListaItens>
    {
        
        /// <summary>
        /// Valor = 1, Item = Diária.
        /// </summary>
        public static PlanosTipoListaItens ItemDiaria;
        
        /// <summary>
        /// Valor = 2, Item = Kilometragem.
        /// </summary>
        public static PlanosTipoListaItens ItemKilometragem;
        
        /// <summary>
        /// Valor = 3, Item = Valor fechado.
        /// </summary>
        public static PlanosTipoListaItens ItemValorFechado;
        
		public static implicit operator PlanosTipoListaItens(int index)
		{
			return GetByIndex(index);
		}

		public static implicit operator int(PlanosTipoListaItens item)
		{
			return item.Index;
		}
        
        static PlanosTipoListaItens()
        {
			ItemDiaria = new PlanosTipoListaItens {Index = 1, Description ="Diária"};
			ItemKilometragem = new PlanosTipoListaItens {Index = 2, Description ="Kilometragem"};
			ItemValorFechado = new PlanosTipoListaItens {Index = 3, Description ="Valor fechado"};

			Items.Add(ItemDiaria);
			Items.Add(ItemKilometragem);
			Items.Add(ItemValorFechado);

        }
    }
    
    /// <summary>
    /// Planos
    /// </summary>
    [EntityDefinitionName("PLANOS")]
    [DataContract(Namespace = "http://Benner.Tecnologia.Common.DataContracts/2007/09", Name = "EntityBase")]
    public partial class Planos : BusinessEntity<Planos>, IPlanos
    {
        
        /// <summary>
        /// Possui constantes para retornarem o nome dos campos definidos no Builder para cada propriedade
        /// </summary>
		public static class FieldNames
		{
			public const string Ativo = "ATIVO";
			public const string DataFim = "DATAFIM";
			public const string DataInicio = "DATAINICIO";
			public const string Identificador = "IDENTIFICADOR";
			public const string ResultadoFinanceiro = "RESULTADOFINANCEIRO";
			public const string Tipo = "TIPO";
			public const string ValorReferencia = "VALORREFERENCIA";
		}

        
        /// <summary>
        /// Ativo (ATIVO.)
        /// Opcional = S, Invisível = False, Default = True
        /// </summary>
        [System.CodeDom.Compiler.GeneratedCodeAttribute("BEF Code Generator", "22.0.36.3")]
        public System.Nullable<bool> Ativo
        {
            get
            {
                return Fields["ATIVO"] as System.Nullable<System.Boolean>;
            }
            set
            {
                Fields["ATIVO"] = value;
            }
        }
        
        /// <summary>
        /// Data fim (DATAFIM.)
        /// Opcional = S, Invisível = False, Formato Data = Dia, Mês, Ano - Formato Hora = Sem hora
        /// </summary>
        [System.CodeDom.Compiler.GeneratedCodeAttribute("BEF Code Generator", "22.0.36.3")]
        public System.Nullable<System.DateTime> DataFim
        {
            get
            {
                return Fields["DATAFIM"] as System.Nullable<System.DateTime>;
            }
            set
            {
                Fields["DATAFIM"] = value;
            }
        }
        
        /// <summary>
        /// Data início (DATAINICIO.)
        /// Opcional = N, Invisível = False, Formato Data = Dia, Mês, Ano - Formato Hora = Sem hora
        /// </summary>
        [System.CodeDom.Compiler.GeneratedCodeAttribute("BEF Code Generator", "22.0.36.3")]
        public System.Nullable<System.DateTime> DataInicio
        {
            get
            {
                return Fields["DATAINICIO"] as System.Nullable<System.DateTime>;
            }
            set
            {
                Fields["DATAINICIO"] = value;
            }
        }
        
        /// <summary>
        /// Identificador (IDENTIFICADOR.)
        /// Opcional = N, Invisível = False, Tamanho = 10
        /// </summary>
        [System.CodeDom.Compiler.GeneratedCodeAttribute("BEF Code Generator", "22.0.36.3")]
        public string Identificador
        {
            get
            {
                return Fields["IDENTIFICADOR"] as System.String;
            }
            set
            {
                Fields["IDENTIFICADOR"] = value;
            }
        }
        
        /// <summary>
        /// Resultado financeiro (RESULTADOFINANCEIRO.)
        /// Opcional = S, Invisível = False, Valor Mínimo = , Valor Máximo = , Tipo do Builder = Valor
        /// </summary>
        [System.CodeDom.Compiler.GeneratedCodeAttribute("BEF Code Generator", "22.0.36.3")]
        public System.Nullable<decimal> ResultadoFinanceiro
        {
            get
            {
                return Fields["RESULTADOFINANCEIRO"] as System.Nullable<System.Decimal>;
            }
            set
            {
                Fields["RESULTADOFINANCEIRO"] = value;
            }
        }
        
        /// <summary>
        /// Tipo (TIPO.)
        /// Opcional = N, Invisível = False
        /// </summary>
        [System.CodeDom.Compiler.GeneratedCodeAttribute("BEF Code Generator", "22.0.36.3")]
        public PlanosTipoListaItens Tipo
        {
            get
            {
                ListItem listItem = Fields["TIPO"] as ListItem;
				if (listItem != null)
					return new PlanosTipoListaItens { Index = listItem.Value, Description = listItem.Text };
				return null;
            }
            set
            {
                if (value != null)
					Fields["TIPO"] = new ListItem(value.Index, value.Description);
				else
					Fields["TIPO"] = null;
            }
        }
        
        /// <summary>
        /// Valor referência (VALORREFERENCIA.)
        /// Opcional = N, Invisível = False, Valor Mínimo = , Valor Máximo = , Tipo do Builder = Valor
        /// </summary>
        [System.CodeDom.Compiler.GeneratedCodeAttribute("BEF Code Generator", "22.0.36.3")]
        public System.Nullable<decimal> ValorReferencia
        {
            get
            {
                return Fields["VALORREFERENCIA"] as System.Nullable<System.Decimal>;
            }
            set
            {
                Fields["VALORREFERENCIA"] = value;
            }
        }
    }
}