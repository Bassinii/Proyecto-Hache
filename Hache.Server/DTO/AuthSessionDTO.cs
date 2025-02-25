﻿using Hache.Server.Entities;

namespace Hache.Server.DTO
{
    public class AuthSessionDTO
    {
        public  string Token { get; set; }
        public int ID_Usuario { get; set; }
        public string NombreUsuario { get; set; } 
        public string CorreoElectronico { get; set; } 
        public string NombreCompleto { get; set; } 
        public int ID_Local { get; set; }
        public TipoUsuario TipoUsuario { get; set; } = new TipoUsuario();
        
        

    }
}