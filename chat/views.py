from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from .models import Chat, Message
from django.contrib.auth import get_user_model
# from .handleRequests import handleRequests
User = get_user_model()


from google import genai
from pydantic import BaseModel
import json
import enum
import os
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

# Access the API keys
api_key = os.environ.get("api_key")
def handleRequests(message):
    class PriorityCategory(enum.Enum):
        High = "high"
        Medium = "medium"
        Low = "low"
    class ConcernCategory(enum.Enum):
        Staff = "staff"
        AI = "ai"
   

    class Classification(BaseModel):
        concern: ConcernCategory
        priority: PriorityCategory
    
    client = google.genai.Client(api_key=api_key)
# Call the API with response schema

    

    response = client.models.generate_content(
        model='gemini-2.0-flash',
        
        contents=f"Could you anaylze this request {message} and classify it as a request that has be handled by a staff member from the hotel or a request that can be handled through a simple prompting to an AI model by setting the concern attribute of the object you will return to either staff or ai. In addition classify the request as a high, medium or low priority request by setting the priority attribute of the object you will return  accordingly by applying sentiment analysis on the request and labeling strongly worded with strong emotions behind them as a having a higher priority ",

        config= {
            "response_mime_type": "application/json",
            "response_schema": Classification
        }
    )
    response_object=response.parsed
    print(response_object.concern.value)
    print(response_object.priority.value)
    return response_object

from enum import Enum
from typing import Optional, Union, Dict, Type
import google.genai
from pydantic import BaseModel
from typing import Literal
import google.generativeai as genai
import json
import google

from user.models import CustomUser, Room, CheckInLog
genai.configure(api_key=api_key)  # Replace with your key
model = genai.GenerativeModel("gemini-2.0-flash")

def handleQuery(query):
  client = google.genai.Client(api_key=api_key)
  training_data = json.dumps([
    {
        "text_input": "What is Boston Partners PLC and its relationship with Kuriftu Resort & Spa?",
        "output": "Boston Partners PLC, established in 2002, is the parent company of Kuriftu Resort & Spa. Over more than 20 years, they have been a catalyst of change in Ethiopian hospitality. Their mission focuses on developing Ethiopia’s unique destinations through creative design, unmatched marketing, and an enduring passion for service. Recently, they have launched a promotional campaign to boost Inter-African Tourism, fostering a fresh mindset within the travel market."
    },
    {
        "text_input": "How does Kuriftu Resort & Spa distinguish itself in the hospitality industry?",
        "output": "Kuriftu Resort & Spa stands out in several ways: it is solely owned and operated by Ethiopians; it provides permanent employment opportunities to over 2000 people; and it supports local businesses by sourcing goods locally. In addition, all furniture and artisan design elements such as thatched roofs, woodwork, leather braiding, and stonework are produced in-house. The resorts are designed and constructed by their own teams to consistently deliver a luxurious 5-star experience."
    },
    {
        "text_input": "Can you tell me about Kuriftu Catering and the services they provide?",
        "output": "Kuriftu Catering is one of Ethiopia’s premier banquet and catering companies with over 200 active corporate clients. They offer creative and unique solutions for events such as corporate functions, birthdays, weddings, meetings, and conferences. Their offerings include customized menus for A La Carte, buffet settings, VVIP fine dining, and staff meal menus—all enhanced by the renowned Ethiopian hospitality that Kuriftu is known for."
    },
    {
        "text_input": "What corporate retreat options does Kuriftu offer and what activities are available?",
        "output": "Kuriftu provides several distinctive corporate retreat experiences. The Entoto retreat offers adventurous team-building activities such as hiking, biking, rope courses, zip-lining, go‑karting, and archery. In Bishoftu, teams can focus on wellness with spa treatments, kayaking, water park activities, and yoga sessions (pre-booking required). The Awash retreat combines cultural and wildlife experiences like river swimming, camel riding, biking, and bird or crocodile watching, while the Lake Tana retreat offers cultural tours, visits to the Blue Nile Falls and ancient monasteries, city tours, and boat rides."
    },
    {
        "text_input": "Tell me about Boston Day Spa and its significance to the Kuriftu brand.",
        "output": "Boston Day Spa is a cornerstone of the Kuriftu brand—it was the inaugural project that launched the Kuriftu brand. Beyond offering a wide range of wellness services, it played a key role in capacity building in Addis Ababa by training local community members, who started as construction workers, into skilled spa professionals. Many of these employees have now been with the company for over 15 years. Additionally, the spa doubles as an art gallery featuring works by renowned Ethiopian artists, emphasizing the brand’s deep cultural ties."
    },
    {
        "text_input": "What are some key cultural and artisan design elements of Kuriftu resorts?",
        "output": "Kuriftu resorts incorporate genuine Ethiopian craftsmanship by producing all of their furniture and cultural elements in-house. Key features include thatched roofs, intricate woodwork, skilled leather braiding, and detailed stonework. These elements not only enhance the resort’s aesthetic appeal but also reflect a deep commitment to preserving Ethiopia’s rich cultural heritage."
    },
    {
        "text_input": "How does Kuriftu contribute to the local community and promote sustainable development?",
        "output": "Kuriftu is dedicated to community empowerment and sustainable development. It employs over 2000 people, with 80% of hiring done within the local community. The company actively supports local businesses by sourcing materials from neighboring communities, thus promoting economic growth. Additionally, its in-house production processes and local construction teams provide career development opportunities, particularly for women, ensuring that the skills of local artisans are maintained and enhanced."
    },
    {
        "text_input": "What unique experiences can guests expect at the Kuriftu Entoto Adventure Park?",
        "output": "At Kuriftu Entoto Adventure Park, guests can immerse themselves in a unique blend of adventure and natural beauty. Set within the lush Entoto Forest, the park offers activities such as rock climbing, horseback riding, and glamping in a tented campsite. Additionally, there are strategically placed dining spots offering a variety of cuisines near activity areas like the horse ranch and rope course, as well as a Forest Spa that creates a serene, eucalyptus-infused environment for relaxation."
    },
    {
        "text_input": "Can you share some notable achievements associated with Kuriftu’s leadership?",
        "output": "Kuriftu’s leadership is widely recognized in the hospitality industry. The CEO, an active member of the Ethiopian Board of Tourism, has earned prestigious awards such as the Platinum Tax Payer Award (2014 Ethiopian Calendar) and African Hospitality Person of The Year (2019). These accolades highlight the visionary and innovative leadership that drives the company’s commitment to excellence, sustainability, and community development."
    },
    {
        "text_input": "Describe the in-house construction and design approach at Kuriftu resorts.",
        "output": "Kuriftu employs a fully integrated in-house approach to both design and construction. Their internal design teams craft culturally inspired resort architectures, and their own construction teams build these resorts using locally sourced materials and traditional artisan methods. This ensures that every detail—ranging from custom-made furniture to unique architectural elements like thatched roofs and intricate woodwork—is meticulously created, delivering a consistently luxurious and authentic Ethiopian experience."
    }
])


  response = client.models.generate_content(
      model='gemini-2.0-flash',
      
      

      contents=f"You're an AI FAQ ASSISTANT FOR KURITFTU RESORT. IF YOUR TRAINING DATA DOESN'T HAVE THE INFORMATION THE USER ASKED GIVE A RELEVANT ANSWER DON'T SAY I DON'T KNOW. DON'T MENTION THAT YOU'RE TRAINING DATA CONTAINS / DOESN'T CONTAIN CERTAIN INFORMATION ACT HUMAN. Given this list of training data {training_data} could you answer the prompt {query} with the most relevant answer from the training data.",
  )

  print(response.text)
  response_text = response.text.strip()
  return response_text

def handle_check_in(user, room_id, dates=None, additional_info=None):
    try:
        # Fetch the room
        room = Room.objects.get(number=room_id)

        # Check if the room is already occupied
        if room.occupied:
            return "Room is already occupied."

        # Update room and user data
        room.occupied = True
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

        return "Check in successfull"

    except Room.DoesNotExist:
        return "Room not found."
    except Exception as e:
        return "Error occured while checking in"
    
def handle_check_out(user, room_id=None, additional_info=None):
    try:
        # Fetch the room
        room = Room.objects.get(number=room_id, current_guest=user)

        # Check if the room is occupied by the user
        if not room.occupied or room.current_guest != user:
            return {"error": "You are not checked into this room."}

        # Update room and user data
        room.occupied = False
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

# ========================
# 1. Enum Definition
# ========================
class IntentType(str, Enum):
    check_in_request = "check_in_request"
    check_out_request = "check_out_request"
    room_availability = "room_availability"
    extend_stay = "extend_stay"
    cancel_reservation = "cancel_reservation"
    booking_request = "booking_request"
    room_change_request = "room_change_request"
    room_amenities = "room_amenities"
    room_cleaning_request = "room_cleaning_request"
    room_issue_report = "room_issue_report"
    maintenance_request = "maintenance_request"
    wifi_info = "wifi_info"
    restaurant_hours = "restaurant_hours"
    facility_location = "facility_location"
    laundry_request = "laundry_request"
    general_question = "general_question"
    ask_for_human = "ask_for_human"
    greeting = "greeting"
    goodbye = "goodbye"
    complaint = "complaint"
    feedback = "feedback"
    faq_question = "faq_question"  # New intent for FAQ questions
    unknown = "unknown"

# ========================
# 2. Specialized Intent Models
# ========================
class CheckInIntent(BaseModel):
    intent: Literal[IntentType.check_in_request]
    room_id: str
    dates: Optional[str] = None
    additional_info: Optional[str] = None

class CheckOutIntent(BaseModel):
    intent: Literal[IntentType.check_out_request]
    room_id: Optional[str] = None
    additional_info: Optional[str] = None

class RoomIssueReportIntent(BaseModel):
    intent: Literal[IntentType.room_issue_report]
    additional_info: str

class WifiInfoIntent(BaseModel):
    intent: Literal[IntentType.wifi_info]
    additional_info: Optional[str] = None

class FAQIntent(BaseModel):  # New model for FAQ questions
    intent: Literal[IntentType.faq_question]
    question: str

class GenericIntent(BaseModel):
    intent: Literal[
        IntentType.room_availability,
        IntentType.extend_stay,
        IntentType.cancel_reservation,
        IntentType.booking_request,
        IntentType.room_change_request,
        IntentType.room_amenities,
        IntentType.room_cleaning_request,
        IntentType.maintenance_request,
        IntentType.restaurant_hours,
        IntentType.facility_location,
        IntentType.laundry_request,
        IntentType.general_question,
        IntentType.ask_for_human,
        IntentType.greeting,
        IntentType.goodbye,
        IntentType.complaint,
        IntentType.feedback,
        IntentType.unknown
    ]
    room_id: Optional[str] = None
    dates: Optional[str] = None
    additional_info: Optional[str] = None
 
IntentUnion = Union[CheckInIntent, CheckOutIntent, RoomIssueReportIntent, WifiInfoIntent, FAQIntent, GenericIntent]

intent_model_map: Dict[str, Type[BaseModel]] = {
    IntentType.check_in_request.value: CheckInIntent,
    IntentType.check_out_request.value: CheckOutIntent,
    IntentType.room_issue_report.value: RoomIssueReportIntent,
    IntentType.wifi_info.value: WifiInfoIntent,
    IntentType.faq_question.value: FAQIntent,  # Map the new FAQ intent
    # Default all others to GenericIntent
}

def detect_intent(user_input: str) -> IntentUnion:
    intent_options = [intent.value for intent in IntentType]

    prompt = f"""
You are a hotel assistant bot that extracts structured data from user messages.
Return a valid JSON object in the following format and include no explanation:

{{
  "intent": one of {intent_options},
  "room_id": string or null (use digits only, e.g. "409"),
  "dates": write in YYYY-MM-DD format,
  "additional_info": string or null,
  "question": string or null (only for faq_question intent)
}}

Make sure the fields are easy to parse by code and avoid vague phrases like "next weekend", "my room", "sometime soon". If there are date fields like next weekend two weeks away etc, today's 4/12/2025 calculate the date and give it in the desired format.

If the user is asking a question about Kuriftu Resort (e.g., amenities, policies, or general FAQs), set the intent to "faq_question" and include the user's question in the "question" field.

User message: "{user_input}"

Only return valid JSON.
"""

    response = model.generate_content(prompt)

    try:
        json_str = response.text.strip("```json").strip("```").strip()
        parsed = json.loads(json_str)

        intent_key = parsed.get("intent", IntentType.unknown)
        model_cls = intent_model_map.get(intent_key, GenericIntent)
        return model_cls.model_validate(parsed)
    except Exception as e:
        print("❌ Error parsing Gemini response:", e)
        print("🔍 Raw response:", response.text)
        return GenericIntent(intent=IntentType.unknown)

def process_intent(intent_obj, user):
    """
    Process the recognized intent and call the appropriate function.
    """
    try:
        if intent_obj.intent == IntentType.check_in_request:
            return handle_check_in(
                user=user,
                room_id=intent_obj.room_id,
                dates=intent_obj.dates,
                additional_info=intent_obj.additional_info,
            )
        elif intent_obj.intent == IntentType.check_out_request:
            return handle_check_out(
                user=user,
                room_id=intent_obj.room_id,
                additional_info=intent_obj.additional_info,
            )
        elif intent_obj.intent == IntentType.faq_question:
            return handleQuery(intent_obj.question)
        else:
            return {"error": f"Intent '{intent_obj.intent}' is not supported."}
    except Exception as e:
        return {"error": str(e)}



# # ========================
# # 6. Example Usage
# # ========================
# if __name__ == "__main__":
#     test_messages = [
#         # "I want to check into room 101 from 2025-04-15 to 2025-04-20.",
#         # "Can I check out of room 101?",
#         "What are the amenities at Kuriftu Resort?",
#     ]

#     for i, msg in enumerate(test_messages, start=1):
#         intent_obj = detect_intent(msg)
#         print(f"\n✅ Parsed Intent Object {i}:")
#         print(intent_obj.model_dump_json(indent=2))

#         # Process the intent
#         user = "test_user"  # Replace with actual user object
#         response = process_intent(intent_obj, user)
#         print(f"🤖 Response: {response}")

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def new_message(request):
    user = request.user
    data = request.data
    print(request.user.email)

    # Extract the message content
    message_content = data.get('message', '').strip()
    if not message_content:
        return Response({"error": "Message content cannot be empty."}, status=400)

    # Get or create a chat for the user (assuming a single chat per user for simplicity)
    chat, created = Chat.objects.get_or_create()
    if created:
        chat.participants.add(user)  # Add the user to the participants of the chat

    # Save the user's message
    user_message = Message.objects.create(chat=chat, sender=user, content=message_content)
    # try:
        # Call the handleRequests function to classify the message
    response_object = handleRequests(message_content)

    print(response_object.concern.value)
    print(response_object.priority.value)
    chat.priority = response_object.priority.value
    chat.save()
    # Check if the concern is 'staff' or 'ai' and handle accordingly

    intent_obj = detect_intent(message_content)
    print(intent_obj)
    print(intent_obj.model_dump_json(indent=2))

    # Process the intent
    
    response = process_intent(intent_obj, user)
    print(f"🤖 Response: {response}")
    return Response({
        "reply": response,
    }, status=201)

    # except:
    #     # Generate a bot response (this is a placeholder; replace with actual logic)
    #     bot_response_content = f"Echo: {message_content}"  # Example bot response
    #     bot_message = Message.objects.create(chat=chat, sender=None, content=bot_response_content)

    return Response({
        "reply": bot_response_content,
    }, status=201)
from django.http import JsonResponse
from django.shortcuts import get_object_or_404
from .models import Chat, Message


def get_guests(request):
    """
    Fetch the list of guests (participants in chats).
    """
    guests = User.objects.filter(chats__isnull=False).distinct()
    guest_data = [
        {
            "id": guest.id,
            "name": guest.name,
            "room": f"{guest.room_no}",  # Replace with actual room data if available
            "checkIn": guest.stay_period_start,  # Replace with actual check-in data if available
            "checkOut": guest.stay_period_end,  # Replace with actual check-out data if available
            "status": "checked-in",  # Replace with actual status if available
            "image": None,  # Replace with actual image URL if available
            "unreadCount": Message.objects.filter(chat__participants=guest).count(),
            'priority' : Chat.objects.filter(participants=guest).first().priority if Chat.objects.filter(participants=guest).exists() else 'medium',
        }
        for guest in guests
    ]
    return JsonResponse(guest_data, safe=False)
def get_messages(request, guest_id):
    """
    Fetch messages for a specific guest.
    """
    guest = get_object_or_404(User, id=guest_id)
    chat = Chat.objects.filter(participants=guest).first()  # Assuming one chat per guest
    if not chat:
        return JsonResponse([], safe=False)

    messages = chat.messages.all().order_by("timestamp")
    message_data = [
        {
            "id": message.id,
            "content": message.content,
            "sender": "staff" if message.sender and message.sender.is_staff else ("guest" if message.sender else "bot"),
            "timestamp": message.timestamp,
            "isRead": True,  # Replace with actual read status if available
        }
        for message in messages
    ]
    return JsonResponse(message_data, safe=False)

def test(request,prompt):
    intent_obj = detect_intent(prompt)
    print(intent_obj)
    print(intent_obj.model_dump_json(indent=2))

    # Process the intent
    user = "test_user"  # Replace with actual user object
    response = process_intent(intent_obj, user)
    print(f"🤖 Response: {response}")
    return JsonResponse({"response": response}, safe=False)


# @api_view(['GET'])
# @permission_classes([IsAuthenticated])
# def get_chat_history(request):
#     """
#     Retrieve the chat history for the authenticated user.
#     """
#     user = request.user

#     # Get the chat associated with the user
#     chat = Chat.objects.filter(participants=user).first()  # Assuming one chat per user
#     if not chat:
#         return Response({"messages": []}, status=200)  # Return an empty list if no chat exists

    
#     # Retrieve all messages in the chat, ordered by timestamp
#     messages = chat.messages.all().order_by("timestamp")
#     message_data = [
#         {
#             "id": message.id,
#             "content": message.content,
#             "sender": "staff" if message.sender and message.sender.is_staff else ("guest" if message.sender else "bot"),
#             "timestamp": message.timestamp.strftime("%Y-%m-%d %H:%M:%S"),
#         }
#         for message in messages
#     ]

#     return Response({"messages": message_data}, status=200)