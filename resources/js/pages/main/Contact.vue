<template>
    <div class="container mt-5">
        <h2 class="text-primary">Contact Us</h2>
        <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus
            malesuada, urna a interdum mollis, nisl nisi rutrum diam, ut ultricies
            ipsum lectus in neque.
        </p>
        <form>
            <div class="form-group">
                <label for="name">Name</label>
                <input type="text" class="form-control" id="name" placeholder="Enter name" />
            </div>
            <div class="form-group">
                <label for="email">Email</label>
                <input type="email" class="form-control" id="email" placeholder="Enter email" />
            </div>
            <div class="form-group">
                <label for="message">Message</label>
                <textarea class="form-control" id="message" rows="3"></textarea>
            </div>
            <button type="submit" class="btn btn-primary">Submit</button>
        </form>
    </div>
</template>
