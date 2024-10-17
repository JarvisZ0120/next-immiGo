import requests
import json
import time



def extract_data_from_url(url):


    crs_score_ranges = ['601-1200', '501-600', '451-500', '491-500', '481-490', '471-480', '461-470',
                    '451-460', '401-450', '441-450', '431-440', '421-430', '411-420', '401-410',
                    '351-400', '301-350', '0-300',"Total"]


    response = requests.get(url)

    # 检查响应状态
    if response.status_code == 200:
        data = response.json()
        data = data['rounds'] 

        # 提取我们需要的字段
        export_json = {}
        value_array = []
        
        for d in data:

            if int(d['drawNumber']) >= 228:
                date_array = []
                for key in range(1, 18):
                    if key in [1, 2, 3, 9, 15, 16, 17]:
                        extracted_data = {} 
                        dd_key = f'dd{key}'
                        if dd_key in d:
                            extracted_data['drawDate'] = d['drawDate']
                            extracted_data['crsScore'] = crs_score_ranges[key-1]
                            extracted_data['population'] = covert_str_to_num(d[dd_key])
                            date_array.append(extracted_data)
                value_array.append(date_array)
            else:
                break

        
            
        value_array.reverse()
        export_json['values'] = value_array

        # 将提取的数据存成JSON文件
        with open('public/exported_data.json', 'w') as json_file:
            json.dump(export_json, json_file, indent=4)

        print("Data successfully extracted and saved to exported_data.json")
    else:
        print(f"Request failed, status code: {response.status_code}")



def covert_str_to_num(num_str):
    cleaned_num_str = num_str.replace(',', '')

    num_int = int(cleaned_num_str)
    return num_int



def main():
    # Define the URL to scrape
    url = 'https://www.canada.ca/content/dam/ircc/documents/json/ee_rounds_123_en.json'
    
    # Call the function to extract data from the URL
    extract_data_from_url(url)





# Check if the script is being run directly
if __name__ == "__main__":
    while True:
        print("Updating the json file .............")
        main()  # 调用主函数
        time.sleep(2 * 60 * 60)  # 暂停 2 小时 (2 hours * 60 minutes * 60 seconds)
