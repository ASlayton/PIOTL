using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using PIOTL.DataAccess;
using PIOTL.Models;

namespace PIOTL.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class VerifyChoreController : ControllerBase
    {
        DatabaseInterface _db;
        VerifyChoreAccess _VerifyChore;

        public VerifyChoreController(DatabaseInterface db)
        {
            _db = db;
            _VerifyChore = new VerifyChoreAccess(db);
        }

        [HttpGet("{id}")]
        public IActionResult GetRequestId(int id)
        {
            var requests = _VerifyChore.GetRequestByFamilyId(id);
            return Ok(requests);
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteById(int id)
        {
            var chore = _VerifyChore.GetRequestByFamilyId(id);

            if (chore == null)
            {
                return NotFound();
            }

            var success = _VerifyChore.DeleteById(id);

            if (success)
            {
                return Ok();
            }
            return BadRequest(new { Message = "Delete was unsuccessful" });
        }

        [HttpPost]
        public async Task<ActionResult<VerifyChore>> PostRequest(VerifyChore VerifyChore)
        {
            return Ok(await _VerifyChore.PostRequest(VerifyChore));
        }
    }
}