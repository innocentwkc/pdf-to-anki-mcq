<template>
  <div>
    <h2>ICMP Ping Results</h2>
    <button @click="startPing">Start Ping</button>
    <button @click="stopPing">Stop Ping</button>
    <table>
      <thead>
        <tr>
          <th>Ip Address</th>
          <th>Port</th>
          <th>Time (ms)</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(result, index) in results" :key="index">
          <td>{{ result.ipaddress }}</td>
          <td>{{ result.port }}</td>
          <td>{{ result.time }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { ref, onBeforeUnmount, onMounted } from 'vue';
import { initFlowbite } from 'flowbite'

const results = ref([]);
let eventSource = null;

const startPing = () => {
  results.value = []; // Clear previous results

  // Regular expression to match the pattern
  const regex = /TCP Ping #\d+ to (\d+\.\d+\.\d+\.\d+):(\d+) successful. Time: (\d+)ms/;

  eventSource = new EventSource('http://localhost:4000/tcp-ping?host=192.168.1.1&ports=3000,443,80&timeout=3000&cycles=-1');

  eventSource.onmessage = (event) => {
    const data = event.data;
    console.log(data)

    let _result = {
      ipAddress: '',
      port: '',
      time: ''
    }

    const matches = data.match(regex);

    if (matches) {
      _result.ipAddress = matches[1]; // IP Address
      _result.port = parseInt(matches[2], 10); // Port
      _result.time = parseInt(matches[3], 10); // Time in milliseconds
    }

    results.value.push(_result);
    // if (data.includes('Sequence')) {
    //   const [sequence, time] = data.replace('Ping to 192.168.1.1: ', '').split(', ');
    //   results.value.push({
    //     sequence: sequence.replace('Sequence ', ''),
    //     time: time.replace('Time: ', '').replace('ms', '')
    //   });
    // }
  };

  eventSource.onerror = (error) => {
    console.error('EventSource failed:', error);
    eventSource.close();
  };
};

const stopPing = () => {
  if (eventSource) {
    eventSource.close();
  }
}

onBeforeUnmount(() => {
  if (eventSource) {
    eventSource.close();
  }
});

onMounted(() => {
  initFlowbite();
});
</script>
