import json
from django.shortcuts import get_object_or_404
from django.http import JsonResponse
from django.contrib.auth import get_user_model
from django.contrib.auth.decorators import login_required

from services.models import Service

from .models import CheckInLog, Feedback, Room
from .FeedbackSummarizer import getClusters
User = get_user_model()
from django.contrib.auth import get_user_model
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework import serializers
User = get_user_model()
from django.shortcuts import get_object_or_404
from notifications.utils import send_push_notification

from google import genai
from pydantic import BaseModel
# from pydantic import List
import json
import enum
@api_view(['POST'])
def register_user(request):
    """Handles user registration"""
    email = request.data.get('email')
    name = "Edeal Aschalew"
    password = request.data.get('password')
    print(request.data)

    # Check if the email is already taken
    if User.objects.filter(email=email).exists():
        return Response({'error': 'Email is already taken'}, status=status.HTTP_400_BAD_REQUEST)

    # Create the new user
    user = User.objects.create_user(name=name, email=email, password=password)

    return Response({'message': 'User registered successfully'}, status=status.HTTP_201_CREATED)

class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        # Extract email, password, and selectedRole from the request data
        email = attrs.get("email")
        password = attrs.get("password")
        selected_role = self.context['request'].data.get("selectedRole")  # Use the request context to get selectedRole
        print(selected_role)  # Debugging: Check if selectedRole is being passed

        # Convert role to a boolean for is_staff comparison
        role = False if selected_role == "guest" else True
        print(role)
        # Validate user existence
        # try:
        user = User.objects.get(email=email, is_staff=role)
        print(user.name)
        # except User.DoesNotExist:
        #     raise serializers.ValidationError({"error": "Invalid email or password"})

        # Proceed with the default validation
        return super().validate(attrs)

class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer

from rest_framework_simplejwt.token_blacklist.models import OutstandingToken, BlacklistedToken
from rest_framework.decorators import api_view
from rest_framework.permissions import IsAuthenticated

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def logout(request):
    """Logs out a user by blacklisting their refresh token"""
    try:
        refresh_token = request.data["refresh"]
        token = RefreshToken(refresh_token)
        token.blacklist()
        return Response({"message": "Logged out successfully"}, status=status.HTTP_200_OK)
    except Exception:
        return Response({"error": "Invalid token"}, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_user_details(request):
    """Logs out a user by blacklisting their refresh token"""
    try:
        user = request.user

        user_details = {
            'email': user.email,
            'name': user.name,
            'role': "staff" if user.is_staff else "guest",
            'has_profile': user.has_profile(),
        }
        print(user_details)
        return Response(user_details, status=status.HTTP_200_OK)
    except Exception:
        return Response({"error": "error"}, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_user_profile(request):
    user = get_object_or_404(User, id=request.user.id)
    user_data = {
        "name": user.name,
        "email": user.email,
        "roomNumber": user.room_no,
        "phone": user.phone_number,
        "checkIn": user.stay_period_start,
        "checkOut": user.stay_period_end,
        "preferences": user.preferences,
        "status":user.status,
    }
    return JsonResponse(user_data)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def set_user_profile(request):
    user = request.user
    data = request.data

    # Extract values from the request data
    arrival_date = data.get('arrivalDate', '')
    leave_date = data.get('leaveDate', '')
    preferences = data.get('preferences', '')
    early_check_in = data.get('earlyCheckIn', False)
    airport_pickup = data.get('airportPickup', False)

    # Update user fields
    user.stay_period_start = arrival_date
    user.stay_period_end = leave_date
    user.preferences = preferences

    # Update optional_services JSON field
    optional_services = user.optional_services or {}
    optional_services['earlyCheckIn'] = early_check_in
    optional_services['airportPickup'] = airport_pickup
    user.optional_services = optional_services

    user.save()

    return Response({"message": "Profile updated successfully"}, status=status.HTTP_200_OK)


def handleFeedback(list_of_json_feedback_objects):
    Feedback_content=json.dumps([feedback['content'] for feedback in list_of_json_feedback_objects])
    class IntentionCategory(enum.Enum):
        Positive = "positive"
        Negative = "negative"
        Neutral = "neutral"
    class FeedbackCategory(enum.Enum):
        Food = "food"
        Cleanliness = "cleanliness"
        Atmosphere = "atmosphere"
        Parking = "parking" 
        Staff = "staff"
        Events = "events"
        ChildFriendliness = "childFriendliness"
        Pricing = "pricing"
        RoomComfort= "roomComfort"
        Technology= "technology"
        Other="other"

    class FeedbackClassification(BaseModel):
        intention: IntentionCategory
        feedback: FeedbackCategory
    class reponseList(BaseModel):
        feedbacks: list[FeedbackClassification]
    
    client = genai.Client(api_key="AIzaSyDGCmMzx2u4nKziWrziPBdItm8ECWm2uYk")
# Call the API with response schema
    

    

    response = client.models.generate_content(
        model='gemini-2.0-flash',
        
        contents=f"Could you anaylze this list of feedbacks collected from hotel customers: {Feedback_content} and classify them as feedbacks concerning food, cleanliness, atmosphere, parking, staff, events, child friendliness, pricing, room comfort, technology or other. In addition classify the feedback as positive, negative or neutral by applying sentiment analysis on the feedback. and you will a list of objects corresponding with the list of feedbacks you were provided with initially. Each response object should have intention and feedback attributes. The intention attribute should be set to either positive, negative or neutral and the feedback attribute should be set to one of the following categories food, cleanliness, atmosphere, parking, staff, events, child friendliness, pricing, room comfort, technology or other. ",

        config={
            "response_mime_type": "application/json",
            "response_schema": reponseList
        }
    )
    # if response.status_code != 200:
    #     raise ValueError(f"API call failed with status code {response.status_code}: {response.text}")
    response_object_list=response.parsed
    print(response_object_list.feedbacks)
    return response_object_list.feedbacks



@api_view(['POST'])
@permission_classes([IsAuthenticated])
def add_feedback(request):
    user = request.user
    data = request.data

    # Extract feedback details from the request
    rating = data.get('rating')
    text = data.get('text', '')

    # Validate rating
    if not rating or not (1 <= int(rating) <= 5):
        return Response({"error": "Rating must be between 1 and 5"}, status=status.HTTP_400_BAD_REQUEST)

    # Create a new feedback entry
    feedback = Feedback.objects.create(user=user, rating=rating, text=text)

    return Response({"message": "Feedback submitted successfully", "feedback": {
        "id": feedback.id,
        "rating": feedback.rating,
        "text": feedback.text,
        "created_at": feedback.created_at,
    }}, status=status.HTTP_201_CREATED)

# @api_view(['GET'])
# @permission_classes([IsAuthenticated])
# def get_dashboard(request):
#     user=  request.user
#     if user.is_staff:
from django.db.models import Avg, Count, F
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from services.models import Service
from chat.models import Message
from notifications.models import Notification
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_analytics_data(request):
    """
    Fetch analytics data for the dashboard, including guest satisfaction trends
    and service usage. Excludes response time analysis and issue categories
    due to missing fields.
    """
    try:
        # Guest Satisfaction Trends
        satisfaction_trends = (
            Feedback.objects.values(month=F("created_at__month"))
            .annotate(
                avg_rating=Avg("rating"),
                positive_feedback=Count("id", filter=F("intention") == "positive"),
                negative_feedback=Count("id", filter=F("intention") == "negative"),
            )
            .order_by("month")
        )
        print(satisfaction_trends)

        # Service Usage
        service_usage = (
            Service.objects.annotate(
                usage_count=Count("bookings"),
                total_revenue=F("price") * Count("bookings")
            )
            .values("title", "usage_count", "total_revenue")
        )

        # Combine available data into a single response
        analytics_data = {
            "satisfaction_trends": list(satisfaction_trends),
            "service_usage": list(service_usage),
        }

        return Response(analytics_data, status=status.HTTP_200_OK)

    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)



from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from .models import Feedback
from services.models import ServiceBooking
from chat.models import Message
from django.utils.timezone import now, timedelta

# @api_view(['GET'])
# @permission_classes([IsAuthenticated])
def get_recent_activities(request):
    """
    Fetch recent activities including feedback, service bookings, and chat alerts.
    """

    # Recent Feedback
    recent_feedback = Feedback.objects.order_by('-created_at')[:5].values(
        'rating', 'text', 'created_at'
    )

    # Recent Service Bookings
    recent_bookings = ServiceBooking.objects.order_by('-booking_date')[:5].values(
        'service__title', 'user__name', 'scheduled_date', 'booking_date'
    )

    # # Recent Chat Alerts (Optional)
    # recent_chats = Message.objects.all().order_by('-crea')[:5].values(
    #     'created_at', 'response_time'
    # )

    # Combine all activities
    activities = {
        "feedback": list(recent_feedback),
        "bookings": list(recent_bookings),
        # "chats": list(recent_chats),
    }

    return Response(activities, status=200)

    # except Exception as e:
    #     return Response({"error": str(e)}, status=500)
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from .models import CustomUser

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_guest_profiles(request):
    """
    Fetch a list of guest profiles.
    """
    try:
        # Query all guests (users who are customers)
        guests = CustomUser.objects.filter(is_customer=True).values(
            'id', 'name', 'room_no', 'stay_period_start', 'stay_period_end', 
            'preferences', 'status', 'phone_number', 'email'
        )

        # Format the data
        guest_profiles = [
            {
                "id": guest['id'],
                "name": guest['name'],
                "room": guest['room_no'],
                "checkIn": guest['stay_period_start'],
                "checkOut": guest['stay_period_end'],
                "status": guest['status'],
                "preferences": guest['preferences'],
                "phone": guest['phone_number'],
                "email": guest['email'],
            }
            for guest in guests
        ]

        return Response(guest_profiles, status=200)

    except Exception as e:
        return Response({"error": str(e)}, status=500)
    from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from .models import CustomUser

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_guest_profile(request, id):
    """
    Fetch a single guest profile by ID.
    """
    try:
        # Fetch the guest by ID
        guest = get_object_or_404(CustomUser, id=id, is_customer=True)

        # Format the guest data
        guest_data = {
            "id": guest.id,
            "name": guest.name,
            "room": {
                "type": "Standard" if guest.room_no else "N/A",  # Example room type logic
                "number": guest.room_no,
            },
            "contact": {
                "email": guest.email,
                "phone": guest.phone_number,
                "address": "N/A",  # Add address if available in the model
            },
            "booking": {
                "checkIn": guest.stay_period_start,
                "checkOut": guest.stay_period_end,
                "nights": (guest.stay_period_end - guest.stay_period_start).days if guest.stay_period_start and guest.stay_period_end else "N/A",
            },
            "preferences": guest.preferences,
            "specialRequests": guest.optional_services,
            "satisfaction": {
                "overall": 4.5,  # Placeholder for satisfaction score (implement logic if needed)
                "lastFeedback": "Great service!",  # Placeholder for last feedback (implement logic if needed)
            },
            "chatPreview": [
                {"message": "Hello, I need assistance with my booking.", "timestamp": "2025-04-10 10:00:00"},
                {"message": "Thank you for your help!", "timestamp": "2025-04-11 15:30:00"},
            ],  # Placeholder for chat preview (implement logic if needed)
            "upsellResponses": [
                {"service": "Spa Package", "price": "$50", "status": "accepted"},
                {"service": "Late Check-out", "price": "$20", "status": "declined"},
            ],  # Placeholder for upsell responses (implement logic if needed)
        }

        return Response(guest_data, status=200)

    except Exception as e:
        return Response({"error": str(e)}, status=500)

from django.utils.dateparse import parse_datetime
def test(request):
    try:
        # Path to the JSON file
        json_file_path = r"c:\Users\Edeal\Downloads\Telegram Desktop\trian.json"
        
        # Load the JSON data
        with open(json_file_path, 'r') as file:
            feedback_data = json.load(file)
        
        # Iterate through the feedback data and create Feedback objects
        for feedback in feedback_data:
            user = CustomUser.objects.filter(id=feedback["user_id"]).first()
            if user:
                Feedback.objects.create(
                    user=user,
                    rating=feedback["rating"],
                    text=feedback["text"],
                    created_at=parse_datetime(feedback["created_at"]),
                    priority=feedback["intention"],
                    category=feedback["category"]
                )
        
        return JsonResponse({"message": "Feedbacks loaded successfully!"}, status=200)
    
    except Exception as e:
        return JsonResponse({"error": str(e)}, status=500)

from django.utils.timezone import now

def handle_check_in(user, room_id, dates=None, additional_info=None):
    try:
        # Fetch the room
        room = Room.objects.get(number=room_id)

        # Check if the room is already occupied
        if room.is_occupied:
            return {"error": "Room is already occupied."}

        # Update room and user data
        room.is_occupied = True
        room.current_guest = user
        room.save()

        # Log the check-in
        CheckInLog.objects.create(
            guest=user,
            room=room,
            action="check_in",
            additional_info=additional_info,
        )

        # Update user's stay period if dates are provided
        if dates:
            start_date, end_date = dates.split(" to ")
            user.stay_period_start = start_date
            user.stay_period_end = end_date
            user.save()

        return {"success": "Check-in successful."}

    except Room.DoesNotExist:
        return {"error": "Room not found."}
    except Exception as e:
        return {"error": str(e)}
    
def handle_check_out(user, room_id=None, additional_info=None):
    try:
        # Fetch the room
        room = Room.objects.get(number=room_id, current_guest=user)

        # Check if the room is occupied by the user
        if not room.is_occupied or room.current_guest != user:
            return {"error": "You are not checked into this room."}

        # Update room and user data
        room.is_occupied = False
        room.current_guest = None
        room.save()

        # Log the check-out
        CheckInLog.objects.create(
            guest=user,
            room=room,
            action="check_out",
            additional_info=additional_info,
        )

        return {"success": "Check-out successful."}

    except Room.DoesNotExist:
        return {"error": "Room not found or you are not checked in."}
    except Exception as e:
        return {"error": str(e)}
    
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def feedback_analysis(request):
    """
    Analyze feedback and return structured data for positive and negative clusters separately,
    along with overall metrics.
    """
    try:
        # Fetch all feedbacks
        all_feedbacks = Feedback.objects.all()

        # Calculate overall metrics
        total_reviews = all_feedbacks.count()
        overall_rating = round(all_feedbacks.aggregate(Avg('rating'))['rating__avg'] or 0, 1)
        response_rate = 92  # Placeholder for response rate (replace with actual logic if available)

        # Fetch positive and negative feedbacks
        positive_feedbacks = all_feedbacks.filter(priority="positive")
        negative_feedbacks = all_feedbacks.filter(priority="negative")

        # Helper function to process feedbacks into clusters
        def process_feedbacks(feedbacks):
            clusters = []
            grouped_feedbacks = {}

            # Group feedbacks by category
            for feedback in feedbacks:
                category = feedback.category or "Other"
                if category not in grouped_feedbacks:
                    grouped_feedbacks[category] = []
                grouped_feedbacks[category].append(feedback)

            # Create clusters
            for category, feedback_list in grouped_feedbacks.items():
                count = len(feedback_list)
                average_rating = sum(f.rating for f in feedback_list) / count
                feedback_details = [
                    {
                        "text": f.text,
                        "rating": f.rating,
                        "date": f.created_at.strftime("%Y-%m-%d"),
                        "guest": f.user.name,
                        "room": f.user.room_no or "N/A",
                    }
                    for f in feedback_list
                ]
                clusters.append({
                    "title": category,
                    "count": count,
                    "averageRating": round(average_rating, 1),
                    "feedbacks": feedback_details,
                })

            return clusters

        # Process positive and negative feedbacks
        positive_clusters = process_feedbacks(positive_feedbacks)
        negative_clusters = process_feedbacks(negative_feedbacks)

        # Combine results
        response_data = {
            "overall_rating": overall_rating,
            "total_reviews": total_reviews,
            "response_rate": response_rate,
            "positive_clusters": positive_clusters,
            "negative_clusters": negative_clusters,
        }

        return Response(response_data, status=status.HTTP_200_OK)

    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)