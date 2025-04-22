import json
from services.models import Service

def import_services_from_json(file_path):
    with open(file_path, 'r') as file:
        services_data = json.load(file)  # Load JSON data

    for service_data in services_data:
        Service.objects.create(
            title=service_data.get('title'),
            description=service_data.get('description'),
            category=service_data.get('category'),
            image=service_data.get('image'),
            price=float(service_data.get('price', 0).replace('$', '')),  # Remove $ and convert to float
            rating=service_data.get('rating'),
            duration=service_data.get('duration'),
            location=service_data.get('location'),
            capacity=service_data.get('capacity'),
            featured=service_data.get('featured', False),
            gallery=service_data.get('gallery', []),
            highlights=service_data.get('highlights', []),
            includes=service_data.get('includes', []),
            schedule=service_data.get('schedule', []),
        )
    print("Services imported successfully!")

# Example usage
# Replace 'services.json' with the path to your JSON file
import_services_from_json('services.json')