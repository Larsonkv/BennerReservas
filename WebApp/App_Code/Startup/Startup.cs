using Benner.Tecnologia.Common;
using Benner.Tecnologia.Common.IoC;
using Benner.Tecnologia.Wes.Components.Helpers;
using Benner.Tecnologia.Wes.Components.Mvc;
using Benner.Tecnologia.Wes.Components.WebApp;
using Microsoft.Owin.Host.SystemWeb;
using Microsoft.Owin.Security;
using Microsoft.Owin.Security.Cookies;
using Owin;
using System.IO;
using System.Reflection;
using System.Web.Compilation;
using System.Web.Hosting;
using System.Web.Http;
using System.Web.Mvc;
using System.Web.Routing;

namespace WebApp
{
    /// <summary>
    /// Summary description for Startup
    /// </summary>
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            RegisterVirtualPathProvider();

            AreaRegistration.RegisterAllAreas();
            WebApiConfig.Register(GlobalConfiguration.Configuration, RouteTable.Routes);
            FilterConfig.RegisterGlobalFilters(GlobalFilters.Filters);
            SwaggerConfig.Register();

            string contentDistPath = Path.Combine(BennerConfiguration.WesFolder, "content", "dist");
            new FileHashGenerator(contentDistPath).HashMinifiedFiles();

            GlobalConfiguration.Configuration.DependencyResolver = new NinjectDependencyResolver(DependencyContainer.InternalKernel);

            if (BennerConfiguration.ExistDefaultSystemInstanceName)
            {
                app.UseCookieAuthentication(new CookieAuthenticationOptions
                {
                    AuthenticationType = "TempCookie",
                    AuthenticationMode = AuthenticationMode.Passive,
                    CookieName = BennerConfiguration.DefaultSystemInstanceName + "_TempCookie",
                    CookieManager = new SystemWebCookieManager(),
                });
            }

            var startup20 = this as IStartup20;
            if (startup20 != null)
                startup20.Configuration20(app);

            var startup30 = this as IStartup30;
            if (startup30 != null)
                startup30.Configuration30(app);

            var startup40 = this as IStartup40;
            if (startup40 != null)
                startup40.Configuration40(app);

            var startup50 = this as IStartup50;
            if (startup50 != null)
                startup50.Configuration50(app);

            RouteConfig.RegisterRoutes(RouteTable.Routes);
        }

        /// <summary>
        /// `HostingEnvironment` ignora provedores de caminho virtual em sites precompilados,
        /// então é chamado manualmente um método interno caso seja site precompilado.
        /// <para>Veja https://sunali.com/2008/01/09/virtualpathprovider-in-precompiled-web-sites/ para mais detalhes.</para>
        /// <para>
        ///   <see cref="HostingEnvironment"/>
        ///   <see cref="BuildManager.IsPrecompiledApp"/>
        /// </para>
        /// </summary>
        private static void RegisterVirtualPathProvider()
        {
            if (BuildManager.IsPrecompiledApp)
            {
                var rvppiMethod = typeof(HostingEnvironment).GetMethod(
                    "RegisterVirtualPathProviderInternal",
                    BindingFlags.Static | BindingFlags.InvokeMethod | BindingFlags.NonPublic
                );

                if (rvppiMethod != null)
                    rvppiMethod.Invoke(null, new object[] { new EntityViewPathProvider() });
            }
            else
            {
                HostingEnvironment.RegisterVirtualPathProvider(new EntityViewPathProvider());
            }
        }
    }

    public interface IStartup20
    {
        void Configuration20(IAppBuilder app);
    }
    public interface IStartup30
    {
        void Configuration30(IAppBuilder app);
    }
    public interface IStartup40
    {
        void Configuration40(IAppBuilder app);
    }
    public interface IStartup50
    {
        void Configuration50(IAppBuilder app);
    }
}