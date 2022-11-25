using System;
using System.Web.Http;
using Benner.Tecnologia.Common;
using Benner.Tecnologia.Common.EnterpriseServiceLibrary;
using Benner.Tecnologia.Wes.Components.WebApp.Controllers;

/// <summary>
/// Métodos para gerenciar reservas
/// </summary>
[Authorize]
public class GerenciadorReservasController : EslController
{
    /// <summary>
    /// Método que consulta Reservas por um status específico
    /// </summary>
    /// <param name="status"></param>
    /// <returns></returns>
    [HttpPost]
    [Route("api/gerenciadorreservas/ReservasPorStatus")]
    public Benner.Reservas.Comum.ReservaPorStatusResponse[] ReservasPorStatus(Int32 status)
    {
        var result = CallBusinessComponent(
            "Benner.Reservas.Componentes.GerenciadorReservas, Benner.Reservas.Componentes",
            "ReservasPorStatus",
            (object)status);

        return (Benner.Reservas.Comum.ReservaPorStatusResponse[])result;
    }

    /// <summary>
    /// Método que consulta Reservas por status e datas
    /// </summary>
    /// <param name="request">Status desejado, data de inicio e data de fim</param>
    /// <returns></returns>
    [HttpPost]
    [Route("api/gerenciadorreservas/ReservasPorStatusData")]
    public Benner.Reservas.Comum.ReservaPorStatusResponse[] ReservasPorStatusData(Benner.Reservas.Comum.ReservaPorStatusRequest request)
    {
        var result = CallBusinessComponent(
            "Benner.Reservas.Componentes.GerenciadorReservas, Benner.Reservas.Componentes",
            "ReservasPorStatusData",
            (object)request);

        return (Benner.Reservas.Comum.ReservaPorStatusResponse[])result;
    }


}