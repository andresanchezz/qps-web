<template>
  <div>
    <FullCalendar :options="calendarOptions" ref="fullCalendar" />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import FullCalendar from '@fullcalendar/vue3';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { useRouter } from 'vue-router';
import type { CalendarInterface } from '../../../interfaces/calendar/calendar.interface';
import { CalendarServices } from '../calendar.services';
import type { EventInput } from '@fullcalendar/core/index.js';
import tippy from 'tippy.js'; 
import 'tippy.js/dist/tippy.css';

const router = useRouter();

const calendarOptions = ref({
  plugins: [dayGridPlugin, interactionPlugin],
  initialView: 'dayGridMonth',
  events: [] as EventInput[],
  editable: false,
  selectable: false,
  eventClick: (info: any) => {
    router.push(`/services/edit/${info.event.id}`);
  },
  eventContent: (arg: any) => {
    const event = arg.event;
    const textBlack = event.extendedProps.status.toLowerCase() === "pending" ? 'text-black' : '';
    return {
      html: `
        <div class="whitespace-normal">
          <p class="${textBlack}" >${event.extendedProps.userName || 'N/A'}</p>
          <p class="${textBlack}"  >${event.extendedProps.communityName || 'N/A'} </p>
        </div>
      `,
    };
  },
  eventDidMount: (info: any) => {
    tippy(info.el, {
      content: `
        <div class="p-2"> 
          <p style="font-weight: 600">${info.event.extendedProps.userName}</p>
          <p> <p style="font-weight: 600" > Community: </p> ${info.event.extendedProps.communityName || 'N/A'}</p>
          <p> <p style="font-weight: 600" > Unit number: </p> ${info.event.extendedProps.unitNumber || 'N/A'}</p>
          <p> <p style="font-weight: 600" > Date: </p> ${info.event.start.toLocaleDateString()}</p>
          <p> <p style="font-weight: 600" > Type: </p> ${info.event.extendedProps.type}</p>
          <p> <p style="font-weight: 600" > Status: </p> ${info.event.extendedProps.status}</p>
        </div>
      `,
      allowHTML: true,
      placement: 'top',
      trigger: 'mouseenter',
      interactive: true,
      theme: 'custom-tooltip'
    });
  },
});

const getEventColor = (status: string): string => {
  const statusFormatted = status ? status.toLowerCase().trim() : '';


  switch (statusFormatted) {
    case "created":
      return '#da1919'; // Rojo
    case "pending":
      return '#f7e83a'; // Amarillo
    case "approved":
      return '#00e01f'; // Verde
    case "rejected":
      return '#9500c1'; // Morado
    case "completed":
      return '#000000'; // Negro
    default:
      return '#00a7b2';
  }
};

onMounted(async () => {
  const events = await CalendarServices.getCalendarData();
  if (events.length > 0) {
    calendarOptions.value.events = events.map((event: CalendarInterface) => ({
      id: event.id,
      date: event.date,
      color: getEventColor(event.status?.statusName),
      extendedProps: {
        userName: event.user?.name || 'N/A',
        communityName: event.community?.communityName || 'N/A',
        status: event.status?.statusName || 'N/A',
        type: event.type?.cleaningType || 'N/A',
        unitNumber: event.unitNumber || 'N/A',
      },
    }));
  }
});

const fullCalendar = ref<typeof FullCalendar | null>(null);

defineExpose({
  getApi: () => fullCalendar.value?.getApi(),
});
</script>

<style>
.fc {
  width: 100%;
  margin: 0 auto;
}


.tippy-box[data-theme="custom-tooltip"] {
  background-color: #ffffff;
  border-radius: 8px;
  border: 1px solid black;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  color: black;
}


.tippy-box[data-theme="custom-tooltip"] .tippy-arrow {
  color: #ffffff;
}
</style>