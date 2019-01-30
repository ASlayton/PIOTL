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
    public class GroceryController : ControllerBase
    {
        DatabaseInterface _db;
        GroceryAccess _Grocery;

        public GroceryController(DatabaseInterface db)
        {
            _db = db;
            _Grocery = new GroceryAccess(db);
        }

        [HttpGet]
        public IActionResult GetAll()
        {
            var allGrocerys = _Grocery.GetAllGrocery();
            return Ok(allGrocerys);
        }

        [HttpGet("{id}")]
        public IActionResult GetGroceryById(int id)
        {
            var singleGrocery = _Grocery.GetGroceryById(id);
            return Ok(singleGrocery);
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteById(int id)
        {
            var Grocery = _Grocery.GetGroceryById(id);

            if (Grocery == null)
            {
                return NotFound();
            }

            var success = _Grocery.DeleteById(id);

            if (success)
            {
                return Ok();
            }
            return BadRequest(new { Message = "Delete was unsuccessful" });
        }

        [HttpPut("Grocery")]
        public IActionResult UpdateGrocery(Grocery Grocery)
        {
            var Grocerys = _Grocery.UpdateGrocery(Grocery);
            return Ok();
        }

        [HttpPost("Grocery")]
        public async Task<ActionResult<Grocery>> PostGrocery(Grocery Grocery)
        {
            return Ok(await _Grocery.PostGrocery(Grocery));
        }
    }
}