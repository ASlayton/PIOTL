using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using PIOTL.DataAccess;
using PIOTL.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace PIOTL.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FamilyController : ControllerBase
    {
        DatabaseInterface _db;
        FamilyAccess _Family;

        public FamilyController(DatabaseInterface db)
        {
            _db = db;
            _Family = new FamilyAccess(db);
        }

        [HttpGet("{id}")]
        public IActionResult GetFamilyById(int id)
        {
            var singleFamily = _Family.GetFamilyById(id);
            return Ok(singleFamily);
        }

        [HttpGet("Family/{name}")]
        public IActionResult GetFamilyByName(string name)
        {
            var family = _Family.GetFamilyByName(name);
            return Ok(family);
        }

        [HttpPost]
        public async Task<ActionResult<Family>> PostFamily(Family Family)
        {
            return Ok(await _Family.PostFamily(Family));
        }
    }
}