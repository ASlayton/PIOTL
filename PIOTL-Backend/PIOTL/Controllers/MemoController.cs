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
    public class MemoController : ControllerBase
    {
        DatabaseInterface _db;
        MemoAccess _Memo;

        public MemoController(DatabaseInterface db)
        {
            _db = db;
            _Memo = new MemoAccess(db);
        }

        [HttpGet]
        public IActionResult GetAllMemos()
        {
            var allMemos = _Memo.GetAllMemos();
            return Ok(allMemos);
        }

        [HttpGet("{id}")]
        public IActionResult GetMemoById(int id)
        {
            var singleMemo = _Memo.GetMemoById(id);
            return Ok(singleMemo);
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteById(int id)
        {
            var Memo = _Memo.GetMemoById(id);

            if (Memo == null)
            {
                return NotFound();
            }

            var success = _Memo.DeleteById(id);

            if (success)
            {
                return Ok();
            }
            return BadRequest(new { Message = "Delete was unsuccessful" });
        }

        [HttpPut("Memo")]
        public IActionResult UpdateMemo(Memo Memo)
        {
            var Memos = _Memo.UpdateMemo(Memo);
            return Ok();
        }

        [HttpPost("Memo")]
        public async Task<ActionResult<Memo>> PostMemo(Memo Memo)
        {
            return Ok(await _Memo.PostMemo(Memo));
        }
    }
}