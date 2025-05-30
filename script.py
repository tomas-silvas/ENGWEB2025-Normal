import json
import unicodedata


def transform_json(data):
    # Adicionar o campo _id igual ao id
    if "id" in data:
        data["_id"] = data["id"]
    
    # Adicionar o campo vencedor com valor vazio se não existir
    if "vencedor" not in data:
        data["vencedor"] = ""
    
    return data

def convert_to_json_array(dataset):
    # Transformar o dataset em uma lista de objetos (JSON Array)
    json_array = []
    for entry in dataset:
        for key, value in entry.items():
            value["id"] = key  # Adicionar o campo id para cada entrada
            json_array.append(transform_json(value))
    return json_array

def process_dataset(input_file, output_file):
    # Ler o arquivo JSON original com codificação correta
    with open(input_file, 'r', encoding='utf-8') as f:
        dataset = json.load(f)
    
    # Converter o dataset para JSON Array
    json_array = convert_to_json_array(dataset)
    
    # Salvar o novo dataset transformado
    with open(output_file, 'w', encoding='utf-8') as f:
        json.dump(json_array, f, indent=4, ensure_ascii=False)
    
    print(f"Arquivo '{output_file}' criado com sucesso!")

# Arquivos de entrada e saída
input_file = "dataset_original.json"
output_file = "dataset.json"

# Processar o dataset
process_dataset(input_file, output_file)