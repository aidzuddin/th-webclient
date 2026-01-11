<script setup lang="ts">
    import { BookUser, Upload, CreditCard, Check } from 'lucide-vue-next';

    defineProps({
        step: {
            type: Number,
            default: 1,
        },
    });

    const steps = [
        {
            step: 1,
            title: 'Personal Information',
            icon: BookUser,
        },
        {
            step: 2,
            title: 'Verification',
            icon: Upload,
        },
        {
            step: 3,
            title: 'Order Confirmation & Payment',
            icon: CreditCard,
        },
    ];
</script>

<template>
    <Stepper
        class="flex flex-row lg:flex-col w-full lg:w-56 h-full lg:justify-start overflow-x-scroll lg:overflow-hidden">
        <StepperItem v-for="item in steps" :key="item.step" class="flex w-full flex-row lg:flex-col items-start"
            :step="item.step">
            <div class="w-full flex lg:block">
                <div class="flex w-full flex-col lg:flex-row items-center gap-2 lg:gap-4 mb-2">
                    <Button :variant="step >= item.step ? 'default' : 'secondary'" size="icon"
                        class="z-10 rounded-full shrink-0">
                        <component :is="item.step < step ? Check : item.icon" class="w-4 h-4" />
                    </Button>
                    <StepperTitle class="lg:block text-wrap text-center lg:text-start">
                        {{ item.title }}
                    </StepperTitle>
                </div>
                <div v-if="item.step !== steps[steps.length - 1]?.step"
                    class="lg:hidden mt-5 h-0.5 bg-gray-100 overflow-hidden"
                    :class="[step > item.step && 'bg-primary']">
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                </div>
                <StepperSeparator v-if="item.step !== steps[steps.length - 1]?.step"
                    class="hidden lg:block h-1 w-full ml-[18px] lg:w-0.5 lg:h-10 rounded-full bg-muted group-data-[state=completed]:bg-primary"
                    :class="[step > item.step && 'bg-primary']" />
            </div>
        </StepperItem>
    </Stepper>
</template>