<template>
    <transition name="fade" mode="in-out" appear>
        <div v-if="show" :class="{'modal-animated': true, 'modal': true, 'is-active': show}">
            <div class="modal-background"></div>
            <div class="modal-card" :class="{ 'modal-card-long': modalCardLong }">
                <header class="modal-card-head">
                    <p class="modal-card-title" v-if="title">{{ title }}</p>
                    <button class="delete" @click="close"></button>
                </header>
                <section class="modal-card-body" v-if="message || bodyComponent">
                    <p class="subtitle is-5 has-text-centered" v-if="subtitle">
                        {{ subtitle }}
                    </p>
                    {{ message }}
                    <component v-bind:is="bodyComponent"
                               @close="close"
                               :submitted="submitted"
                               :additional="additional">
                    </component>
                </section>
                <footer class="modal-card-foot">
                    <a v-if="showButtons" class="button is-primary" @click="submit">Submit</a>
                    <a v-if="showButtons" class="button" @click="close">Cancel</a>
                </footer>
            </div>
        </div>
    </transition>
</template>

<script>
    import Vue from 'vue'

    export default {

        props: {
            title: String,
            subtitle: String,
            message: String,
            bodyComponent: Object,
            additional: Object,
            showButtons: {
                type: Boolean,
                default: true
            },
            modalCardLong: {
                type: Boolean,
                default: false
            },
            container: {
                type: String,
                default: '.popups'
            }
        },

        data () {
            return {
                $_parent_: null,
                show: true,
                submitted: 0
            }
        },

        created () {
            let $parent = this.$parent;
            if (!$parent) {
                let parent = document.querySelector(this.container);
                if (!parent) {
                    // Lazy creating `div.popups` container.
                    const className = this.container.replace('.', '');
                    const Popups = Vue.extend({
                        name: 'Popups',
                        render (h) {
                            return h('div', {
                                'class': {
                                    [`${className}`]: true
                                }
                            });
                        }
                    });
                    $parent = new Popups().$mount();
                    document.body.appendChild($parent.$el);
                } else {
                    $parent = parent.__vue__;
                }
                this.$_parent_ = $parent;
            }
        },

        mounted () {
            if (this.$_parent_) {
                this.$_parent_.$el.appendChild(this.$el);
                this.$parent = this.$_parent_;
                delete this.$_parent_;
            }

        },

        destroyed () {
            this.$el.remove();
        },

        methods: {
            submit () {
                this.submitted++;
            },
            close () {
                clearTimeout(this.timer);
                this.show = false;
            },
            afterLeave () {
                this.$destroy();
            }
        }
    }
</script>
