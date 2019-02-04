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
    public class ChoreController : ControllerBase
    {
        DatabaseInterface _db;
        ChoreAccess _Chore;

        public ChoreController(DatabaseInterface db)
        {
            _db = db;
            _Chore = new ChoreAccess(db);
        }

        [HttpGet]
        public IActionResult GetAllChores()
        {
            var allChores = _Chore.GetAllChores();
            return Ok(allChores);
        }

        [HttpGet("{id}")]
        public IActionResult GetChoreById(int id)
        {
            var singleChore = _Chore.GetChoreById(id);
            return Ok(singleChore);
        }

        [HttpGet("choreByUser/{id}")]
        public IActionResult GetAllChoresByUser(int id)
        {
            var choreByUser = _Chore.GetAllChoresbyUser(id);
            return Ok(choreByUser);
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteById(int id)
        {
            var Chore = _Chore.GetChoreById(id);

            if (Chore == null)
            {
                return NotFound();
            }

            var success = _Chore.DeleteById(id);

            if (success)
            {
                return Ok();
            }
            return BadRequest(new { Message = "Delete was unsuccessful" });
        }

        [HttpPut("Chore")]
        public IActionResult UpdateChore(Chore Chore)
        {
            var Chores = _Chore.UpdateChore(Chore);
            return Ok();
        }

        [HttpPost("Chore")]
        public async Task<ActionResult<Chore>> PostChore(Chore Chore)
        {
            return Ok(await _Chore.PostChore(Chore));
        }
    }
}