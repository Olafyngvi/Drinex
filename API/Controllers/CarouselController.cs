using System.Collections;
using System.Collections.Generic;
using System.Threading.Tasks;
using API.Dtos;
using API.Errors;
using AutoMapper;
using Core.Entities;
using Core.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;

namespace API.Controllers
{
    public class CarouselController : BaseApiController
    {
        private readonly IPhotoService _photoService;
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;
        private readonly IConfiguration _config;
        public CarouselController(IPhotoService photoService, IUnitOfWork unitOfWork, IMapper mapper, IConfiguration config)
        {
            _config = config;
            _mapper = mapper;
            _unitOfWork = unitOfWork;
            _photoService = photoService;
        }

        [HttpGet]
        public async Task<ActionResult<IReadOnlyList<Carousel>>> GetCarousels()
        {
            var photos = await _unitOfWork.Repository<Carousel>().ListAllAsync();
            foreach (var photo in photos)
            {
                photo.PictureUrl = _config["ApiUrl"] + photo.PictureUrl;
            }
            return Ok(photos);  
        }

        [HttpPost]
        [Authorize(Roles = "Admin")]
        [DisableRequestSizeLimit] 
        public async Task<ActionResult> AddCarouselPhoto([FromForm] ProductPhotoDto photoDto)
        {
            if (photoDto.Photo.Length > 0)
            {
                var photo = await _photoService.SaveCarouselToDiskAsync(photoDto.Photo);

                if (photo != null)
                {
                    _unitOfWork.Repository<Carousel>().Add(photo);
                    await _unitOfWork.Complete();
                    return Ok();
                }
            }
            return BadRequest(new { Error = "Greška pri dodavanju slike" });
        }

        [HttpDelete("{photoId}")]
        [Authorize(Roles = "Admin")]
        public async Task<ActionResult> DeleteCarouselPhoto(int photoId)
        {
            var photo = await _unitOfWork.Repository<Carousel>().GetByIdAsync(photoId);

            if (photo != null)
            {
                _photoService.DeleteCarouselPhoto(photo);
                _unitOfWork.Repository<Carousel>().Delete(photo);
                await _unitOfWork.Complete();
            }
            else
            {
                return BadRequest(new ApiResponse(400, "Photo does not exist"));
            }
            return Ok();
        }
    }
}