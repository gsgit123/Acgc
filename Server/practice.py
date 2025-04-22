# import pandas as pd          # For data handling
# import numpy as np           # For numerical operations
# import matplotlib.pyplot as plt  # For basic plotting
# import seaborn as sns 

# # Replace 'your_file.csv' with the actual path to your CSV file
# file_path = "/Users/ojaspatil/Downloads/Book(Sheet2)-2.csv"

# # Read the CSV file
# df = pd.read_csv(file_path)
# print(df.head(6))
# print(df.describe())
# # Get the first column

# import matplotlib.pyplot as plt
# import numpy as np

# data = np.random.randn(1000) 

# plt.figure(figsize=(10, 5))  # Create a figure of size 10x5 inches

# # First subplot
# plt.subplot(1, 2, 1)  # (Rows, Columns, Plot Number)
# plt.plot([1, 2, 3, 4], [10, 20, 25, 30], color='r')
# plt.title("Plot 1")

# # Second subplot
# plt.subplot(1, 2, 2)
# plt.bar([1, 2, 3, 4], [10, 20, 25, 30], color='g')
# plt.title("Plot 2")

# plt.show()
# from datetime import datetime
# now = datetime.now()
# print(now)
# print(now.year,now.month,now.day)



# # Example string dates
# date_strings = ["2023-01-01", "2023-02-15", "2023-03-20"]

# # Convert to datetime
# date_times = pd.to_datetime(date_strings)
# print(date_times)
import numpy as np
import pandas as pd
from datetime import datetime

# # Creating a list of datetime objects
# dates = [
#     datetime(2011, 1, 2), datetime(2011, 1, 5), datetime(2011, 1, 7),
#     datetime(2011, 1, 8), datetime(2011, 1, 10), datetime(2011, 1, 12)
# ]

# # Creating a Pandas Series with random values
# ts = pd.Series(np.random.randn(6), index=dates)

# # Printing the time series
# print(ts)
# current_date = datetime.now()

# # Format as MM/DD/YY
# format1 = current_date.strftime("%m/%d/%y")

# # Print the result
# print("format1 =", format1)
# df = pd.read_excel('/Users/ojaspatil/Downloads/prac.xlsx')
# print(df.head(6))
data = {'Name': ['Jai','Princi','Gaurav','Anuj'],
       'Age':['12','23','23','14'],
       'Gender':['M','F','M','M'],
       'Marks': [12,45,65,'NaN']}
df = pd.DataFrame(data)
c = avg = 0
for ele in df['Marks']:
    if str(ele).isnumeric():
          c += 1
          avg += ele

avg /= c
df = df.replace(to_replace='NaN',value=avg)
print(df)



