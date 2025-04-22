import json
from google import genai
from pydantic import BaseModel
def getClusters(feedback_json_list):
      feedback_json_string = json.dumps([feedback['content'] for feedback in feedback_json_list])
      
      client = genai.Client(api_key="AIzaSyDGCmMzx2u4nKziWrziPBdItm8ECWm2uYk")

      class response_config(BaseModel):
        common_issue: str
        feedbacks: list[str]

      class responseList(BaseModel):
        clusters: list[response_config]

      response = client.models.generate_content(
      model='gemini-2.0-flash',
      
      contents=f"Given this list of feedbacks collected from hotel customers: {feedback_json_string}  could you divide them into clusters where the content of feedbacks from the content attribute of the feedback object in a given cluster are generally addressing the same issue. Your response should be a list of objects where the common_issue attribure of the object should a summarized version of the feedbacks in the cluster and the feedbacks attribute should be a list of the corresponding feedbacks within a cluster directly from the list i originally passed in this prompt. Make the common_issue field more descriptive, don't make it just one word.",

       config= {
            "response_mime_type": "application/json",
            "response_schema": responseList
        }
  )

      response_object_list=response.parsed
      print(response_object_list.clusters)
      return response_object_list.feedbacks

  
  


  
