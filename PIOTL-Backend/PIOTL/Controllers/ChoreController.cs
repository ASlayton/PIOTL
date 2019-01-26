using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using PIOTL.DataAccess;
using PIOTL.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace BangazonInc.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ChoreController : ControllerBase
    {
        DatabaseInterface _db;
        ChoreStorage _Chore;

        public ChoreController(DatabaseInterface db)
        {
            _db = db;
            _Chore = new ChoreStorage(db);
        }

        [HttpGet]
        public IActionResult GetAll()
        {
            var allChores = _Chore.GetChore();
            return Ok(allChores);
        }

        [HttpGet("{id}")]
        public IActionResult GetChoreById(int id)
        {
            var singleChore = _Chore.GetChoreById(id);
            return Ok(singleChore);
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
        public async Task<ActionResult<Chore>> PostChore(ChoreWithEmployeeId Chore)
        {
            return Chore.EmployeeId is null
                ? Ok(await _Chore.PostChore(Chore))
                : Ok(await _Chore.PostChoreAndAssignToEmployee(Chore));
        }
    }
}