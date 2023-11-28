import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TextInput,
  Button,
} from "react-native";

import Checkbox from "expo-checkbox";

const CounselingForm = () => {
  const [name, setName] = useState("");
  const [department, setDepartment] = useState("");
  const [mobile, setMobile] = useState("");
  const [age, setAge] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [date, setDate] = useState("");

  const [takenBefore, setTakenBefore] = useState(false);
  const [heradAboutUs, setHeradAboutUs] = useState([
    {
      name: "বন্ধু",
      checked: false,
    },
    {
      name: "পরিবার",
      checked: false,
    },
    {
      name: "ডাক্তার",
      checked: false,
    },
    {
      name: "অনলাইন",
      checked: false,
    },
  ]);
  const [problems, setProblems] = useState([
    {
      name: "মন খারাপ",
      checked: false,
    },
    {
      name: "ধুমপান/মাদক গ্রহণের অনাস আছে",
      checked: false,
    },
    {
      name: "সম্পর্কের অবনতি",
      checked: false,
    },
    {
      name: "ঘুম খুব কম/খুব বেশি হয়",
      checked: false,
    },
    {
      name: "কাজে অনাগ্রহ",
      checked: false,
    },
    {
      name: "অস্থিরতা",
      checked: false,
    },
    {
      name: "কোন কাজে মনোযোগ দিতে না পারা",
      checked: false,
    },
    {
      name: "সিদ্ধান্তহীনতা",
      checked: false,
    },
    {
      name: "পরীক্ষাীতি",
      checked: false,
    },
    {
      name: "আত্মহত্যার চিন্তা",
      checked: false,
    },
    {
      name: "অতিরিক্ত রাগ",
      checked: false,
    },
    {
      name: "সামাজিক দক্ষতার অভাব",
      checked: false,
    },
    {
      name: "তীব্র মানসিক আঘাত",
      checked: false,
    },
    {
      name: "অতিরিক্ত/খুব কম খাবার খাই",
      checked: false,
    },
    {
      name: "মানসিক চাপ",
      checked: false,
    },
    {
      name: "দুশ্চিন্তা",
      checked: false,
    },
    {
      name: "Others",
      checked: false,
    },
  ]);

  const [otherProblem, setOtherProblem] = useState("");

  const [counselingType, setCounselingType] = useState([
    {
      type: "ব্যক্তিগত কাউন্সেলিং",
      checked: false,
    },
    {
      type: "গ্রুপ কাউন্সেলিং",
      checked: false,
    },
    {
      type: "মানসিক অবস্থা যাচাই",
      checked: false,
    },
  ]);

  const [counselingTime, setCounselingTime] = useState([
    {
      time: "সকাল ৯.০০টা",
      checked: false,
    },
    {
      time: "সকাল ১০.০০টা",
      checked: false,
    },
    {
      time: "সকাল ১১.০০টা",
      checked: false,
    },
    {
      time: "দুপুর ১২.০০টা",
      checked: false,
    },
    {
      time: "দুপুর ১.০০টা",
      checked: false,
    },
    {
      time: "দুপুর ২.০০টা",
      checked: false,
    },
  ]);

  const [counselingDay, setCounselingDay] = useState([
    {
      day: "রবিবার",
      checked: false,
    },
    {
      day: "সোমবার",
      checked: false,
    },
    {
      day: "মঙ্গলবার",
      checked: false,
    },
    {
      day: "বুধবার",
      checked: false,
    },
    {
      day: "বৃহস্পতিবার",
      checked: false,
    },
  ]);

  const handleProblemChange = (index) => {
    const newProblems = [...problems];
    newProblems[index].checked = !newProblems[index].checked;

    // Reset the custom problem text when deselecting "Others"
    if (index !== problems.length - 1) {
      setOtherProblem("");
    }

    setProblems(newProblems);
  };

  const handleOtherProblemChange = (text) => {
    setOtherProblem(text);
  };

  const handleHeradAboutUsChange = (index) => {
    const newHeradAboutUs = [...heradAboutUs];
    newHeradAboutUs[index].checked = !newHeradAboutUs[index].checked;
    setHeradAboutUs(newHeradAboutUs);
  };

  const handleCounselingTypeChange = (index) => {
    const newCounselingType = [...counselingType];
    newCounselingType[index].checked = !newCounselingType[index].checked;
    setCounselingType(newCounselingType);
  };

  const handleCounselingTimeChange = (index) => {
    const newCounselingTime = [...counselingTime];
    newCounselingTime[index].checked = !newCounselingTime[index].checked;
    setCounselingTime(newCounselingTime);
  };

  const handleCounselingDayChange = (index) => {
    const newCounselingDay = [...counselingDay];
    newCounselingDay[index].checked = !newCounselingDay[index].checked;
    setCounselingDay(newCounselingDay);
  };

  const handleSubmit = () => {
    const formData = {
      name,
      department,
      mobile,
      age,
      email,
      address,
      date,
      takenBefore,
      heradAboutUs: heradAboutUs
        .filter((source) => source.checked)
        .map((source) => source.name),
      problems: problems
        .filter((problem) => problem.checked)
        .map((problem) =>
          problem.name === "Others" ? otherProblem : problem.name
        ),
      counselingType: counselingType
        .filter((type) => type.checked)
        .map((type) => type.type),
      counselingTime: counselingTime
        .filter((time) => time.checked)
        .map((time) => time.time),
      counselingDay: counselingDay
        .filter((day) => day.checked)
        .map((day) => day.day),
    };
    console.log(JSON.stringify(formData));
    // TODO: Submit the form data to the server
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text
          style={{
            textAlign: "center",
            fontWeight: "bold",
            fontSize: 28,
            padding: 10,
            marginBottom: 30,
            borderColor: "#000",
            borderWidth: 2,
            borderRadius: 10,
            backgroundColor: "#ececec",
          }}
        >
          Counseling Center{"\n"}Registration Form
        </Text>

        <TextInput
          style={styles.input}
          placeholder="Name"
          value={name}
          onChangeText={(text) => setName(text)}
        />

        <TextInput
          style={styles.input}
          placeholder="Mobile"
          value={mobile}
          onChangeText={(text) => setMobile(text)}
        />

        <TextInput
          style={styles.input}
          placeholder="Age"
          value={age}
          onChangeText={(text) => setAge(text)}
          keyboardType="numeric"
        />

        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={(text) => setEmail(text)}
          keyboardType="email-address"
        />

        <TextInput
          style={styles.input}
          placeholder="Address"
          value={address}
          onChangeText={(text) => setAddress(text)}
        />

        <TextInput
          style={styles.input}
          placeholder="Date"
          value={date}
          onChangeText={(text) => setDate(text)}
        />

        <Text style={styles.subtitle}>
          আপনার ক্ষেত্রে প্রযোজ্য বিষয়গুলোর পাশে টিক দিনঃ
        </Text>
        {problems.map((problem, index) => (
          <View key={index} style={styles.checkboxContainer}>
            <Checkbox
              value={problem.checked}
              onValueChange={() => handleProblemChange(index)}
              title={problem.name}
            />
            <Text style={styles.checkboxText} editable={false}>
              {problem.name}
            </Text>
            {problem.name === "Others" && problem.checked && (
              <TextInput
                style={[styles.input, styles.otherProblemInput]}
                placeholder="Describe other problem"
                value={otherProblem}
                onChangeText={handleOtherProblemChange}
              />
            )}
          </View>
        ))}

        <Text style={styles.subtitle}>
          কোন ধরনের কাউন্সেলিং সেবা নিতে চাচ্ছেন?
        </Text>
        {counselingType.map((type, index) => (
          <View key={index} style={styles.checkboxContainer}>
            <Checkbox
              value={type.checked}
              onValueChange={() => handleCounselingTypeChange(index)}
            />
            <Text style={styles.checkboxText}>{type.type}</Text>
          </View>
        ))}

        <Text style={styles.subtitle}>
          কখন কাউন্সেলিং সেবা নিতে চাচ্ছেন? (সুবিধাজনক সময়):
        </Text>
        {counselingTime.map((time, index) => (
          <View key={index} style={styles.checkboxContainer}>
            <Checkbox
              value={time.checked}
              onValueChange={() => handleCounselingTimeChange(index)}
            />
            <Text style={styles.checkboxText}>{time.time}</Text>
          </View>
        ))}

        <Text style={styles.subtitle}>
          কখন কাউন্সেলিং সেবা নিতে চাচ্ছেন? (সুবিধাজনক দিন):
        </Text>
        {counselingDay.map((day, index) => (
          <View key={index} style={styles.checkboxContainer}>
            <Checkbox
              value={day.checked}
              onValueChange={() => handleCounselingDayChange(index)}
            />
            <Text style={styles.checkboxText}>{day.day}</Text>
          </View>
        ))}

        <Text style={styles.subtitle}>আগে কখনো কাউন্সেলিং সেবা নিয়েছেন ?</Text>
        <View style={styles.checkboxContainer}>
          <Checkbox
            value={takenBefore}
            onValueChange={() => setTakenBefore(!takenBefore)}
          />
          <Text style={styles.checkboxText}>হ্যাঁ</Text>
        </View>

        <Text style={styles.subtitle}>কাউন্সেলিং সম্পর্কে কোথায় জেনেছেন?</Text>
        {heradAboutUs.map((source, index) => (
          <View key={index} style={styles.checkboxContainer}>
            <Checkbox
              value={source.checked}
              onValueChange={() => handleHeradAboutUsChange(index)}
            />
            <Text style={styles.checkboxText}>{source.name}</Text>
          </View>
        ))}

        <Button title="Submit" onPress={handleSubmit} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 10,
    borderRadius: 5,
  },
  subtitle: {
    fontSize: 18,
    marginTop: 10,
    marginBottom: 10,
    fontWeight: "bold",
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  checkboxText: {
    marginLeft: 10,
    fontSize: 18, // Optional: Adjust the font size as needed
    color: "black", // Optional: Adjust the text color
  },
  otherProblemInput: {
    height: 100, // Adjust the height as needed
    textAlignVertical: "top", // Android only
    width: "70%",
  },
});

export default CounselingForm;
