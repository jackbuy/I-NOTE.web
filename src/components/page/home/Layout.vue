<template>
    <div class="home">
        <div class="home-content">
            <slot name="tag"></slot>
            <slot name="content"></slot>
        </div>
        <div class="home-side">
            <slot name="introduce"></slot>
            <slot name="topic"></slot>
            <slot name="author"></slot>
            <slot name="operation"></slot>
        </div>
    </div>
</template>
