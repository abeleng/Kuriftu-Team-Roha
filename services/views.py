from django.http import JsonResponse, Http404
from django.utils.timezone import now
from .models import Service, ServiceBooking
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
def get_service(request, id):
    try:
        service = Service.objects.get(id=id)
        service_data = {
            "id": service.id,
            "title": service.title,
            "description": service.description,
            "category": service.category,
            "image": service.image,
            "price": f"${service.price}",
            "rating": service.rating,
            "duration": service.duration,
            "location": service.location,
            "capacity": service.capacity,
            "featured": service.featured,
            "gallery": service.gallery,
            "highlights": service.highlights,
            "includes": service.includes,
            "schedule": service.schedule,
            'is_booked': ServiceBooking.objects.filter(service=service).exists(),  # Check if the service is booked

        }
        return JsonResponse(service_data, safe=False)
    except Service.DoesNotExist:
        raise Http404("Service not found")
from django.http import JsonResponse
from .models import Service

def get_services(request):
    services = Service.objects.all()
    services_data = [
        {
            "id": service.id,
            "title": service.title,
            "description": service.description,
            "category": service.category,
            "image": service.image,
            "price": f"${service.price}",
            "rating": service.rating,
            "location": service.location,
            "duration": service.duration,
            "capacity": service.capacity,
            "featured": service.featured,
            'is_booked': ServiceBooking.objects.filter(service=service).exists(),  # Check if the service is booked
        }
        for service in services
    ]
    return JsonResponse(services_data, safe=False)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def toggle_booking(request, service_id):
    """
    Toggle the booking status of a service for the logged-in user.
    """
    try:
        service = Service.objects.get(id=service_id)
        user = request.user

        # Check if the user already has a booking for this service
        existing_booking = ServiceBooking.objects.filter(user=user, service=service).first()

        if existing_booking:
            # If a booking exists, cancel it
            existing_booking.delete()
            return JsonResponse({"message": "Booking canceled successfully."}, status=200)
        else:
            # If no booking exists, create a new one
            scheduled_date = request.POST.get("scheduled_date", now())  # Default to now if no date is provided
            ServiceBooking.objects.create(user=user, service=service, scheduled_date=scheduled_date)
            return JsonResponse({"message": "Booking created successfully."}, status=201)

    except Service.DoesNotExist:
        return JsonResponse({"error": "Service not found."}, status=404)
    except Exception as e:
        return JsonResponse({"error": str(e)}, status=500)

