using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace CateringModule.Models
{
    public class BaseEntity
    {
        public DateTime created_at { get; set; }
        public DateTime? updated_at { get; set; }
    }
}