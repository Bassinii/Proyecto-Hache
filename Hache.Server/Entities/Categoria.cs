﻿namespace Hache.Server.Entities
{
    public class Categoria
    {
        public int ID_Categoria { get; set; }
        public int ID_TipoPedido { get; set; }
        public string Nombre { get; set; } = string.Empty;

        public Categoria() { }
    }
}
