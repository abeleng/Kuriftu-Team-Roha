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
def handleRequests(requestObject):
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
    
    client = genai.Client(api_key=api_key)
# Call the API with response schema
    

    request_data=json.loads(requestObject)
    request=request_data['request']

    response = client.models.generate_content(
        model='gemini-2.0-flash',
        
        contents=f"Could you anaylze this request {request} and classify it as a request that has be handled by a staff member from the hotel or a request that can be handled through a simple prompting to an AI model by setting the concern attribute of the object you will return to either staff or ai. In addition classify the request as a high, medium or low priority request by setting the priority attribute of the object you will return  accordingly by applying sentiment analysis on the request and labeling strongly worded with strong emotions behind them as a having a higher priority ",

        config= {
            "response_mime_type": "application/json",
            "response_schema": Classification
        }
    )
    response_object=response.parsed
    print(response_object.concern.value)
    print(response_object.priority.value)
    return response_object


mock_request = json.dumps({
    "request": "I would like to book a conference room for 20 people next week. Can you assist me with the availability and pricing?"
})
handleRequests(mock_request)