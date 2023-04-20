using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Datumparkering.Infrastrukture
{
    public class MyApiConnection
    {
        private string? _connectionString;

        private readonly MyApiConnection _apiConnection;

        public MyApiConnection()
        {
            var config = new ConfigurationBuilder().AddUserSecrets<MyApiConnection>()
                        .Build();
            _connectionString = config.GetConnectionString("GoogleMapsApiKey");
        }

        public string GetConnectionString()
        {
            return _connectionString;
        }

    }
}
